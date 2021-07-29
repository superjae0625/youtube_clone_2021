export const localsMiddleware = ( req, res, next ) => {
    res.locals.loggedIn = Boolean( req.session.loggedIn );
    // console.log( req.session );
    res.locals.siteName = " Wetube";
    // console.log( res.locals );
    res.locals.loggedInUser = req.session.user;
    next();
};