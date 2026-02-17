import axios from "axios";
import { spotifyConfig } from "../config/spotify.config.js";
import { URLSearchParams } from "node:url";

export const generateAuthUrl = async () => {
  const params = new URLSearchParams({
    client_id: spotifyConfig.clientID!,
    response_type: "code"!,
    redirect_uri: spotifyConfig.redirectUri!,
    scope: spotifyConfig.scopes!,
    show_dialog: "true",
  });

  return `${spotifyConfig.authUrl}?${params.toString()}`;
};

export const exchangeCodeForToken = async (code: string) => {
  const response = await axios.post(
    spotifyConfig.tokenUrl,
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: spotifyConfig.redirectUri!,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${spotifyConfig.clientID}:${spotifyConfig.clientSecret}`,
          ).toString("base64"),
      },
    },
  );
  return response.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post(
    spotifyConfig.tokenUrl,
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${spotifyConfig.clientID}:${spotifyConfig.clientSecret}`,
          ).toString("base64"),
      },
    },
  );

  return response.data;
};

export const getUserProfile = async (accessToken: string) => {
  const responce = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return responce.data;
};
