// this file will contain the schema of the user model

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    productId  : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Product"
    },
    addressId   : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Address"
    },
    quantity   : {
        type : Number,
        require : true,      
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


module.exports = mongoose.model("Order", userSchema);