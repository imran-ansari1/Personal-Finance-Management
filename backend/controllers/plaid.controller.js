import { plaidClient } from "../config/plaid.js";
import User from "../db/user.js";

export const createLinkToken = async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: req.user._id.toString(), // JWT middleware se user
      },
      client_name: "Finance App",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });

    res.status(200).json({
      linkToken: response.data.link_token,
    });
  } catch (error) {
  console.log(error);
  console.log(error.response?.data);

  return res.status(500).json({
    message: "Failed to create link token",
    error: error.response?.data || error.message,
  });
}
};
export const getAccounts = async (req, res) => {
  try {

    // 1. Logged-in user ko DB se lao
    const user = await User.findById(req.user._id);

    // 2. User mila ya nahi
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3. Plaid access token hai ya nahi
    if (!user.plaidAccessToken) {
      return res.status(400).json({
        message: "Bank account not connected",
      });
    }

    // 4. Plaid se accounts fetch karo
   const response = await plaidClient.accountsGet({
  access_token: user.plaidAccessToken,
});

return res.status(200).json(response.data.accounts);

    return res.status(200).json(response.data.accounts);

  } catch (error) {
  console.log("Plaid Error:", error.response?.data);
  console.log("Full Error:", error);

  return res.status(500).json({
    message: error.response?.data || error.message,
  });
}
};


export const getTransactions = async (req, res) => {
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

    const response = await plaidClient.transactionsSync({
      access_token: user.plaidAccessToken,
    });

    return res.status(200).json({
      transactions: response.data.added,
      totalTransactions: response.data.added.length,
    });

  } catch (error) {
    console.log(error.response?.data || error);

    return res.status(500).json({
      message: error.response?.data || error.message,
    });
  }
};