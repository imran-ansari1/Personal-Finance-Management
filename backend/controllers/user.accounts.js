import User from "../db/user.js";
import Account from "../db/account.model.js";
// import transaction from "../db/transaction.model.js";
// import bcrypt from "bcrypt";
import { plaidClient } from "../config/plaid.js";

 const getAccountswithdb = async (req, res) => {
  try {
    const userId = req.user._id;

    // Logged in user
    const user = await User.findById(userId);

    if (!user || !user.plaidAccessToken) {
      return res.status(400).json({
        success: false,
        message: "Plaid account not connected",
      });
    }

    // Fetch accounts from Plaid
    const response = await plaidClient.accountsGet({
      access_token: user.plaidAccessToken,
    });

    const accounts = response.data.accounts;

    // Save/Update accounts in MongoDB
    for (const account of accounts) {
      await Account.findOneAndUpdate(
        {
          accountId: account.account_id,
        },
        {
          user: userId,
          accountId: account.account_id,
          name: account.name,
          officialName: account.official_name,
          type: account.type,
          subtype: account.subtype,
          holderCategory: account.holder_category,
          mask: account.mask,
          availableBalance: account.balances.available,
          currentBalance: account.balances.current,
          creditLimit: account.balances.limit,
          currency: account.balances.iso_currency_code,
        },
        {
          new: true,
          upsert: true,
        }
      );
    }

    const savedAccounts = await Account.find({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      accounts: savedAccounts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { getAccountswithdb };