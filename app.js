// const express = require( 'express' );
//require - getting node module from somewhere

import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();


// function handleHome ( req, res ) {
//     console.log( req );
//     res.send( "Hello from home" );
// }

// const handleHome = ( req, res ) => res.send( "Hello from home" );



// function handleProfile ( req, res ) {
//     res.send( "You are on my profile" );
// }

// const handleProfile = ( req, res ) => res.send( "You are on my profile" );

// //MIDDLEWARE
// const betweenHome = ( req, res, next ) => {
//     console.log( "Bwetween" );
//     next();
// };

// //MIDDLEWARE
app.use( cookieParser() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( helmet() );
app.use( morgan( "dev" ) );


// const middleware = ( req, res, next ) => {
//     res.send( "not happening" );
// };
// //middleware는 연결을 끊을 수도 있음

// app.get( "/", middleware, handleHome );
// //연결 끊기



// app.use( betweenHome );
//this is for every page to actions (global)
//ex) if you want it specific page, put betweenHome in the middle of "/" and "handleHome"
//and then handle route (below) after middleware
//order is important


// app.get( "/", handleHome );

// app.get( "/profile", handleProfile );

//routers
app.use( routes.home, globalRouter );
app.use( routes.users, userRouter );
app.use( routes.videos, videoRouter );

//creating server, route and answer them



// // respond with "hello world" when a GET request is made to the homepage
// app.get( '/', function ( req, res ) {
//     res.send( 'hello world' );
// } );

export default app;