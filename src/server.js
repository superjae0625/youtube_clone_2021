import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();
const logger = morgan( "dev" );

app.set( "view engine", "pug" );
app.set( "views", process.cwd() + "/src/views" );
app.use( logger );
app.use( express.urlencoded( { extended: true } ) );

app.use( session( {
    secret: "Hello!",
    resave: true,
    saveUninitialized: true
} )
);

//백엔드에서 다른 브라우저로 접근 시 각각 다른 세션id를 지정해 줌
app.use( ( req, res, next ) => {
    req.sessionStore.all( ( error, sessions ) => {
        console.log( sessions );
        next();
    } );
} );

//routers
app.use( "/", rootRouter );
app.use( "/users", userRouter );
app.use( "/videos", videoRouter );

export default app;