import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    nid:{
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    images: {
        type: [String],
        
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    eventdate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    repotedBy: {
        type: String,
        
    },
    imagesUploadedBy:{
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false
    }

})  

const News = mongoose.model("news", newsSchema);

export default News