import { Router } from "express";

import {
  roastArtists,
  roastTracks,
  roastPlayList,
} from "../controllers/roast.controller.js";

import { checkAuth } from "../middlewares/requireAuth.middleware.js";

const roastRouter = Router();

roastRouter.route("/artist").get(checkAuth, roastArtists);
roastRouter.route("/tracks").get(checkAuth, roastTracks);
roastRouter.route("/playlists").get(checkAuth, roastPlayList);

export default roastRouter;
