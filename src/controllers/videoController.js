import Video from "../models/Video";

export const home = async ( req, res ) => {
    try {
        const videos = await Video.find( {} ).sort( { createdAt: "desc" } );
        return res.render( "home", { pageTitle: "Home", videos } );
    } catch {
        return res.render( "server-error" );
    }
};

export const watch = async ( req, res ) => {
    const { id } = req.params;
    // const id = req.params.id;
    // console.log( "Show video", id );

    // console.log( id );
    const video = await Video.findById( id );
    // console.log( video );
    if ( video === null ) {
        return res.render( "404", { pageTitle: "Video not found." } );
        //not working above 404 code
    }
    return res.render( "watch", { pageTitle: video.title, video } );

};

export const getEdit = async ( req, res ) => {
    const { id } = req.params;
    const video = await Video.findById( id );
    if ( !video ) {
        return res.render( "404", { pageTitle: "Video not found." } );
        //not working above 404 code
    }
    return res.render( "edit", { pageTitle: `Editing ${ video.title }`, video } );
};

export const postEdit = async ( req, res ) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists( { _id: id } );
    if ( !video ) {
        return res.render( "404", { pageTitle: "Video not found." } );
        //not working above 404 code
    }
    await video.findByIdAndUpdate( id, {
        title, description, hashtags: hashtags.Video.formathashtags( hashtags )
    } );
    // video.title = title;
    // video.description = description;
    // video.hashtags = hashtags.split( "," ).map( ( word ) => word.startsWith( '#' ) ? word : `#${ word }` );
    await video.save();
    return res.redirect( `/videos/${ id }` );
};

export const getUpload = ( req, res ) => {
    return res.render( "upload", { pageTitle: "Upload Video" } );
};

export const postUpload = async ( req, res ) => {
    //add a video to the videos array
    const { title, description, hashtags } = req.body;
    try {
        await Video.create( {
            title,
            description,
            hashtags: hashtags
        } );
        return res.redirect( "/" );
    } catch ( error ) {
        return res.render( "upload", { pageTitle: "Upload Video", errorMessage: error._message } );
    }

};

export const deleteVideo = async ( req, res ) => {
    const { id } = req.params;
    await Video.findByIdAndDelete( id );
    console.log( id );
    //delete video
    return res.redirect( "/" );
};

export const search = async ( req, res ) => {
    // console.log( req.query );
    const { keyword } = req.query;
    let videos = [];
    if ( keyword ) {
        videos = await Video.find( {
            title: {
                $regex: new RegExp( keyword, "i" )
            }
        } );
    }
    return res.render( "search", { pageTitle: "Search", videos } );
};