import { Router } from "express";
import { createUser, login_user, logout_user,  } from "../controllers/user.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js"
const route = Router();

route.route("/register").post(createUser);
route.route("/login").post(login_user);
route.route("/logout").post(verifyToken, logout_user);

export default route;
