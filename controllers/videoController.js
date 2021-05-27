export const videoHome = ( req, res ) => res.render( "home", { pageTitle: "Home" } );
export const videoSearch = ( req, res ) => {
    // console.log( req.query.term );
    // const searchingBy = req.query.term; (same thing with the below code)
    // const { query: { term: searchingBy } } = req;
    // console.log( searchingBy );
    res.render( "search", { pageTitle: "Search", searchingBy: searchingBy } );
};



export const videos = ( req, res ) => res.render( "videos", { pageTitle: "Videos" } );
export const upload = ( req, res ) => res.render( "upload", { pageTitle: "Upload" } );
export const videoDetail = ( req, res ) => res.render( "videoDetail", { pageTitle: "Video Detail" } );
export const editVideo = ( req, res ) => res.render( "editVideo", { pageTitle: "Edti Video" } );
export const deleteVideo = ( req, res ) => res.render( "deleteVideo", { pageTitle: "Delete Video" } );

