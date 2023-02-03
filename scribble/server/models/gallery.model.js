const mongoose = require('mongoose')
const GallerySchema = new mongoose.Schema({
    collectionName: [{

        user_id: {
            type: String
        },
        title: {
            type: String,
            required: [true, "Title required"]
        },
        image: {
            type: String,
            required: [true, "Image Required"]
        },
        description: {
            type: String
        }
        // comments: {
        //     type: [String],
        //     default: []
        // }
    },{timestamps:true}],
    
    default: [],
    user_id: {
        type: String
    },

    collectionTitle: {
        type: String,
        required: true
    },
    about: {
        type: String
    }


}, { timestamps: true });

module.exports.Gallery = mongoose.model('Gallery', GallerySchema);