import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const loggerMiddleWare = morgan( "dev" );

// const logger = ( req, res, next ) => {
//     console.log( `${ req.method } ${ req.url }` );
//     next();
// };

const privateMiddleware = ( req, res, next ) => {
    const url = req.url;
    if ( url === "/protected" ) {
        return res.send( "<h1>Not Allowed</h1>" );
    }
    console.log( "Allowed, you may continue." );
    next();
};

const handleHome = ( req, res ) => {
    return res.send( "I love middlewares" );
};

app.use( loggerMiddleWare );
// app.use( logger );
app.use( privateMiddleware );
app.get( "/", handleHome );


app.listen( PORT, () => console.log( `✅ Server listening on port http://localhost:${ PORT }` ) );