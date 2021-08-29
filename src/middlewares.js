import multer from "multer";

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
        req.flash( "error", "Log in first" );
        return res.redirect( "/login" );
    }
};

export const publicOnlyMiddleware = ( req, res, next ) => {
    if ( !req.session.loggedIn ) {
        next();
    } else {
        req.flash( "error", "Not Authorized" );
        return res.redirect( "/" );
    }
};

export const avatarUpload = multer( {
    dest: "uploads/avatars/",
    limits: {
        fileSize: 3000000,
    }
} );
export const videoUpload = multer( {
    dest: "uploads/videos/",
    limits: {
        fileSize: 100000000

    }
} );