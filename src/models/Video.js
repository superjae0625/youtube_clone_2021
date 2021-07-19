import mongoose from "mongoose";


const videoSchema = new mongoose.Schema( {
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [ { type: String, trim: true } ],
    meta: {
        views: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 }
    }
} );

videoSchema.pre( "save", async function () {
    // console.log( "We are about to save:", this );
    this.hashtags = this.hashtags[ 0 ]
        .split( "," )
        .map( word => word.startsWith( "#" ) ? word : `#${ word }` );
} );

videoSchema.static( 'formatHashtags', function ( hastags ) {
    return hashtags.split( "," ).map( word => word.startsWith( "#" ) ? word : `#${ word }` );
} );

const Video = mongoose.model( "Video", videoSchema );
export default Video;