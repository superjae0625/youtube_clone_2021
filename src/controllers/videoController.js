import Video from "../models/Video";
import User from "../models/User";

export const home = async ( req, res ) => {
    try {
        const videos = await Video.find( {} ).sort( { createdAt: "desc" } ).populate( "owner" );
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
    const video = await Video.findById( id ).populate( "owner" );
    // console.log( video );

    if ( !video ) {
        return res.render( "404", { pageTitle: "Video not found." } );
        //not working above 404 code
    }
    return res.render( "watch", { pageTitle: video.title, video } );

};

export const getEdit = async ( req, res ) => {
    const { id } = req.params;
    const { user: { _id } } = req.session;
    const video = await Video.findById( id );
    if ( !video ) {
        return res.status( 404 ).render( "404", { pageTitle: "Video not found." } );
        //not working above 404 code
    }
    console.log( typeof video.owner, typeof _id );
    if ( String( video.owner ) !== String( _id ) ) {
        return res.status( 403 ).redirect( "/" );
    }
    return res.render( "edit", { pageTitle: `Editing ${ video.title }`, video } );
};

export const postEdit = async ( req, res ) => {
    const { id } = req.params;
    const { user: { _id } } = req.session;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists( { _id: id } );
    if ( !video ) {
        return res.status( 404 ).render( "404", { pageTitle: "Video not found." } );
        //not working above 404 code
    }
    if ( String( video.owner ) !== String( _id ) ) {
        return res.status( 403 ).redirect( "/" );
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
    const { user: { _id } } = req.session;
    const { video, thumb } = req.files;
    console.log( video, thumb );
    //add a video to the videos array
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await Video.create( {
            title,
            description,
            fileUrl: video[ 0 ].path,
            thumbUrl: thumb[ 0 ].path,
            owner: _id,
            hashtags: hashtags
        } );
        const user = await User.findById( _id );
        user.videos.push( newVideo._id );
        user.save();
        return res.redirect( "/" );
    } catch ( error ) {
        return res.render( "upload", { pageTitle: "Upload Video", errorMessage: error._message } );
    }
};

export const deleteVideo = async ( req, res ) => {
    const { id } = req.params;
    const { user: { _id } } = req.session;
    const video = await Video.findById( id );
    if ( !video ) {
        return res.status( 404 ).render( "404", { pageTitle: "Video not found." } );
    }
    if ( String( video.owner ) !== String( _id ) ) {
        return res.status( 403 ).redirect( "/" );
    }
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
        } ).populate( "owner" );
    }
    return res.render( "search", { pageTitle: "Search", videos } );
};


export const registerView = async ( req, res ) => {
    const { id } = req.params;
    const video = await Video.findById( id );
    if ( !video ) {
        //if not find the video
        return res.sendStatus( 404 );
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    //ok를 뜻함 200
    return res.sendStatus( 200 );
};