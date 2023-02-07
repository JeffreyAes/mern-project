const mongoose = require('mongoose')
const GallerySchema = new mongoose.Schema({
    collectionList: [{

        user_id: {
            type: String
        },
        title: {
            type: String,
            required: [true, "Title required"],
            unique: [true, "Title must be unique"]
        },
        image: {
            type: String,
            required: [true, "Image Required"]
        },
        description: {
            type: String
        },
        
        // comments: {
        //     type: [String],
        //     default: []
        // }
    },{timestamps:true}],
    
    default: [],
    user_id: {
        type: String,
        required: [true, "id is required"]
    },

    collectionTitle: {
        type: String,
        required: [true, "title is required"]
    },
    about: {
        type: String
    }


}, { timestamps: true });

module.exports.Gallery = mongoose.model('Gallery', GallerySchema);