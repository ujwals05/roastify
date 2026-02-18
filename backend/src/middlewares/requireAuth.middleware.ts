import { NextFunction, Request, Response } from "express";
import axios from "axios";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    req.user = response.data;
    next();
  } catch (error) {
    console.error("Error checking authentication: ", error);
  }
};
