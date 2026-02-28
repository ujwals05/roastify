import {
  getTopArtists,
  getTopTracks,
  getUserPlayLists,
} from "./spotify.service.js";
import {
  buildArtistContext,
  buildTrackContext,
  buildPlaylistContext,

} from "./aiContext.service.js";
import {
  buildArtistRoastPrompt,
  buildTrackRoastPrompt,
  buildPlaylistRoastPrompt,
} from "./aiRoast.service.js";
import { generateGeminiContent } from "./gemini.service.js";

export const roastTopArtists = async (accessToken: string) => {
  const artists = await getTopArtists(accessToken);

  const context = buildArtistContext(artists);

  const prompt = buildArtistRoastPrompt(context);

  return await generateGeminiContent(prompt);
};

export const roastTopTracks = async (accessToken: string) => {
  const tracks = await getTopTracks(accessToken);

  const context = buildTrackContext(tracks);

  const prompt = buildTrackRoastPrompt(context);

  return await generateGeminiContent(prompt);
};

export const roastUserPlaylists = async (accessToken: string) => {
  const playlists = await getUserPlayLists(accessToken);

  const context = buildPlaylistContext(playlists);

  const prompt = buildPlaylistRoastPrompt(context);

  return await generateGeminiContent(prompt);
};