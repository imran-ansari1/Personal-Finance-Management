
import { plaidClient } from "../config/plaid.js";
import User from "../db/user.js";

 const exchangePublicToken = async (req, res) => {
  try {
    const { publicToken } = req.body;
     console.log("BODY:", req.body);

    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    await User.findByIdAndUpdate(req.user._id, {
      plaidAccessToken: accessToken,
      plaidItemId: itemId,
    });

    return res.status(200).json({
      message: "Bank connected successfully",
    });
  } catch (error) {
    console.error(error.response?.data || error);

    return res.status(500).json({
      message: "Failed to exchange token",
      error: error.response?.data || error.message,
    });
  }
};
export { exchangePublicToken };