import { Request, Response } from "express";

import {
  roastTopArtists,
  roastTopTracks,
  roastUserPlaylists,
} from "../services/roast.service.js";

export const roastArtists = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies?.access_token;

    const roast = await roastTopArtists(accessToken);

    return res.status(200).json({ success: true, type: "artist", roast });
  } catch (error) {
    console.error("Artist roast error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate artist roast",
    });
  }
};

export const roastTracks = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies?.access_token;

    const roast = await roastTopTracks(accessToken);

    return res.status(200).json({ success: true, type: "track", roast });
  } catch (error) {
    console.error("Tracks roast error: ", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate track roast",
    });
  }
};

export const roastPlayList = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies?.access_token;

    const roast = await roastUserPlaylists(accessToken);

    return res.status(200).json({ success: true, type: "playlist", roast });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate playlist roast",
    });
  }
};
