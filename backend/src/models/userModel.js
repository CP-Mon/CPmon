/**
 * A constructor for User
 * @param {String} username 
 * @param {String} password 
 * @param {String} email 
 * @param {List} CPmonList 
 * @param {Number} money 
 * @param {Number} exp 
*/
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id : {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    CPmonList:{
        type : Array,
        require: true,
        default : []
    },
    money:{
        type : Number,
        require: true,
        default : 0
    },
    exp:{
        type : Number,
        require: true,
        default : 0
    }
});

const User = mongoose.model("User", userSchema);

export default User;