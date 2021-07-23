import express from "express";
import { getJoin, postJoin, getlogin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get( "/", home );
rootRouter.route( "/join" ).get( getJoin ).post( postJoin );
rootRouter.route( "/login" ).get( getlogin ).post( postLogin );
rootRouter.get( "/search", search );

export default rootRouter;