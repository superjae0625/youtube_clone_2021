import express from "express";
import routes from "../routes";
import { videoHome, videoSearch } from "../controllers/videoController";
import { userJoin, userLogin, userLogout } from "../controllers/userController";


const globalRouter = express.Router();

globalRouter.get( routes.home, videoHome );
globalRouter.get( routes.search, videoSearch );
globalRouter.get( routes.join, userJoin );
globalRouter.get( routes.login, userLogin );
globalRouter.get( routes.logout, userLogout );


export default globalRouter;