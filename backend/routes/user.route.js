import { Router } from "express";
import { createUser, login_user, logout_user  } from "../controllers/user.controller.js";
// import { getAccounts } from "../controllers/user.transation.js";
import {verifyToken} from "../middlewares/auth.middleware.js"
import { exchangePublicToken  } from "../controllers/exchangePublicToken.controller.js";
import { getAccounts, getTransactions } from "../controllers/plaid.controller.js";
import { getAccountswithdb } from "../controllers/user.accounts.js";
import { syncTransactions } from "../controllers/user.transation.js";
import { getCurrentUser } from "../controllers/user.controller.js";
const router = Router();
// user routes
router.route("/register").post(createUser);
router.route("/login").post(login_user);
router.route("/logout").post(verifyToken, logout_user);

// account routes
// router.route("/accounts").get(verifyToken, getAccounts);

// plaid routes
import { createLinkToken } from "../controllers/plaid.controller.js";
router.route("/plaid/create-link-token").post(verifyToken, createLinkToken);

router.post("/exchange-token", verifyToken, exchangePublicToken);
router.get("/accounts", verifyToken, getAccounts);
router.get("/transactions", verifyToken, getTransactions);

router.get("/accounts-with-db", verifyToken, getAccountswithdb);
router.get("/sync-transactions", verifyToken, syncTransactions);
router.get("/me", verifyToken, getCurrentUser);

export default router;
