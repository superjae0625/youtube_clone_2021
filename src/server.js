

import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";


const app = express();
const logger = morgan( "dev" );

app.set( "view engine", "pug" );
app.set( "views", process.cwd() + "/src/views" );
app.use( logger );
app.use( express.urlencoded( { extended: true } ) );

//sending browser a cookie
app.use(
    session( {
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     maxAge: 20000,
        // },
        store: MongoStore.create( { mongoUrl: process.env.DB_URL } )
    } )
);

//백엔드에서 다른 브라우저로 접근 시 각각 다른 세션id를 지정해 줌
// app.use( ( req, res, next ) => {
//     req.sessionStore.all( ( error, sessions ) => {
//         console.log( sessions );
//         next();
//     } );
// } );

app.get( "/add-one", ( req, res, next ) => {
    req.session.patato += 1;
    return res.send( `${ req.session.id }\n${ req.session.patato }` );
} );


app.use( localsMiddleware );
app.use( "/uploads", express.static( "uploads" ) );
app.use( "/assets", express.static( "assets" ) );

//routers
app.use( "/", rootRouter );
app.use( "/users", userRouter );
app.use( "/videos", videoRouter );
app.use( "/api", apiRouter );

export default app;