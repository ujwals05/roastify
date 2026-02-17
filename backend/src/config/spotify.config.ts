import dotenv from "dotenv";

dotenv.config();

export const spotifyConfig = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  authUrl: "https://accounts.spotify.com/authorize",
  tokenUrl: "https://accounts.spotify.com/api/token",
  scopes: ["user-top-read", "user-read-email", "user-read-private"].join(" "),
};