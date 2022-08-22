// this file will contain the schema of the product model

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    manufacturer: {
        type: String,
        require: true,
    },
    availableItems: {
        type: Number,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
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


module.exports = mongoose.model("Product", userSchema);