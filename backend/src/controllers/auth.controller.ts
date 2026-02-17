import e, { Request, Response } from "express";
import {
  generateAuthUrl,
  exchangeCodeForToken,
  refreshAccessToken,
  getUserProfile,
} from "../services/spotify.service.js";

export const login = async (req: Request, res: Response) => {
  const url = generateAuthUrl();
  res.redirect(await url);
};

export const callBack = async (req: Request, res: Response) => {
  try {
    const { code, error } = req.query;
    if (error) {
      return res.status(400).json({
        error: "Authorization failed",
      });
    }

    if (!code || typeof code !== "string") {
      return res.status(400).json({
        error: "Invaid code",
      });
    }

    const tokenData = await exchangeCodeForToken(code);

    const { access_token, refresh_token } = tokenData;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
  } catch (error) {
    console.error("Error during spotify callback:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.status(200).json({
    message: "Logged out successfully",
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(400).json({ error: "No refresh token provided" });
    }
    const tokenData = await refreshAccessToken(refreshToken);
    const { access_token, expires_in } = tokenData;
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: expires_in * 1000,
    });
    res.json({ message: "Token refreshed" });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const profile = await getUserProfile(accessToken);
    res.json(profile);
  } catch (error) {
    console.log("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error " });
  }
};
