import mongoose from "mongoose";

const societySchema = new mongoose.Schema({
    socid:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true      
        
    },
    logo:{
        type: String,
       
    },
    image: {
        type: [String],
        
    },
    createdDate: {
        type: Date,
        required: true,        
        default: Date.now()
    }

})

const Society = mongoose.model("society", societySchema);    

export default Society