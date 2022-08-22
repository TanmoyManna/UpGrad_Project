// this file will contain the schema of the address model

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    contactNumber: {
        type: String,
        require: true,
        minLenght : 10,
    },
    street: {
        type: String,
        require: true,
    },
    landmark: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    zipCode: {
        type: String,
        require: true,
    },
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
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


module.exports = mongoose.model("Address", userSchema);