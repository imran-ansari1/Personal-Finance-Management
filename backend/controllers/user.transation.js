import User from "../db/user.js";

import Transaction from "../db/transations.model.js";
import { plaidClient } from "../config/plaid.js";
import e from "express";

 const syncTransactions = async (req, res) => {
  try {
    
    // Logged in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.plaidAccessToken) {
      return res.status(400).json({
        message: "Bank account not connected",
        
      });
    }
    

    let added = [];
    let hasMore = true;
    let cursor = user.plaidCursor || null;

    // Plaid se latest transactions fetch
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: user.plaidAccessToken,
        cursor,
      });
      console.log(JSON.stringify(response.data.added[0], null, 2));

      added.push(...response.data.added);

      cursor = response.data.next_cursor;
      hasMore = response.data.has_more;
    }

    // Cursor save karo
    user.plaidCursor = cursor;
    await user.save();

    // Bulk Update / Insert
    const operations = added.map((tx) => ({
      updateOne: {
        filter: {
          transactionId: tx.transaction_id,
        },
        
      update: {
  $set: {
    user: user._id,
    accountId: tx.account_id,
    name: tx.name,
    merchantName: tx.merchant_name,
    amount: tx.amount,
    currency: tx.iso_currency_code || "USD",
    date: tx.date,
    authorizedDate: tx.authorized_date,
    category: tx.category,
    pending: tx.pending,
    paymentChannel: tx.payment_channel,

    transactionType:
      tx.personal_finance_category?.primary === "INCOME"
        ? "credit"
        : "debit",

    personalFinanceCategory:
      tx.personal_finance_category?.primary,

    logoUrl: tx.logo_url,

    website: tx.website,
  },
},
        upsert: true,
      },
    }));

    

    


    if (operations.length > 0) {
      await Transaction.bulkWrite(operations);
    }

    // Latest transactions DB se lao
    const transactions = await Transaction.find({
      user: user._id,
    }).sort({
      date: -1,
      
    });

    // Income
    const totalIncome = transactions
      .filter((tx) => tx.transactionType === "credit")
      .reduce((sum, tx) => sum + tx.amount, 0);

// Expense
const totalExpense = transactions
  .filter((tx) => tx.transactionType === "debit")
  .reduce((sum, tx) => sum + tx.amount, 0);

// Pending Transactions
const pendingTransactions = transactions.filter(
  (tx) => tx.pending === true
).length;

// Completed Transactions
const completedTransactions = transactions.filter(
  (tx) => tx.pending === false
).length;

// Recent Transactions
const recentTransactions = transactions.slice(0, 5);

return res.status(200).json({
  success: true,
  message: "Transactions synced successfully",

  summary: {
    totalTransactions: transactions.length,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    pendingTransactions,
    completedTransactions,
  },

  recentTransactions,

  transactions,
});
const creditTransactions = transactions.filter(
  t => t.transactionType === "credit"
);

console.log(creditTransactions);
    
  } catch (error) {
    console.log(error.response?.data || error);

    return res.status(500).json({
      message: error.response?.data || error.message,
    });
  }
};
export { syncTransactions };