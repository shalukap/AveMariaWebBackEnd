import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: "Auther"//admin, auther,photographer
    },
    phone:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "Active"
    }
})

const User = mongoose.model("user", userSchema);    

export default User