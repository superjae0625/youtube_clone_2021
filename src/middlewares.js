export const localsMiddleware = ( req, res, next ) => {
    res.locals.loggedIn = Boolean( req.session.loggedIn );
    // console.log( req.session );
    res.locals.siteName = " Wetube";
    // console.log( res.locals );
    res.locals.loggedInUser = req.session.user || {};
    // console.log( req.session.user );
    next();
};

export const protectorMiddleware = ( req, res, next ) => {
    if ( req.session.loggedIn ) {
        next();
    } else {
        return res.redirect( "/login" );
    }
};

export const publicOnlyMiddleware = ( req, res, next ) => {
    if ( !req.session.loggedIn ) {
        next();
    } else {
        return res.redirect( "/" );
    }
};

export const uploadFiles = multer( { dest: "uploads/" } );