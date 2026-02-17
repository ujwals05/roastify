import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  callBack,
  getProfile
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/login").get(login);
authRouter.route("/callback").get(callBack);
authRouter.route("/refresh").post(refreshToken);
authRouter.route("/logout").get(logout);
authRouter.route("/profile").get(getProfile)

export default authRouter;
