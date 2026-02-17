import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  callBack,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/login").get(login);
authRouter.route("/callback").get(callBack);
authRouter.route("/refresh").post(refreshToken);
authRouter.route("/logout").post(logout);

export default authRouter;
