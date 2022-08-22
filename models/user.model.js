// this file will contain the schema of the user model

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },        
    password: {
        type: String,
        require: true
    },
    contactNumber : {
        type : Number,
        require : true,        
        minLenght : 10,
    },
    user_role: {
        type: String,
        require: true,
        default: "USER",
        enum : ["USER", "ADMIN"]
    },
    address : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Address"
    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now()
        },
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },
});


module.exports = mongoose.model("User", userSchema);