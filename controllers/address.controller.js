/**
 * This file will have the logic realted to address
 */
const User = require("../models/user.model");
const Address = require("../models/address.model");



/**
 * Create a function to allow the user to add address
 * 
 * If the user is not logged in and tries to access this endpoint we will handle that via the middleware
 * we will do the req body validation like zip code and contact number in the middleware
 * 
 */
exports.addAddress = async (req, res) => {
    /**
     * First read the request body and create the JS object to be 
     * inserted in the DB
     */
    try {
        const addressObj = {
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            street: req.body.street,
            landmark: req.body.landmark,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            user: req.userId
        }

        /**
         * Insert  the data in the databse
         */
        const savedAddress = await Address.create(addressObj);

        /**
         * we need to have bidirectional relationship for address and user
         * 
         */

        const requestedUser = await User.findById(req.userId);
        requestedUser.address.push(savedAddress._id);
        requestedUser.save();


        const postResponse = {
            _id: savedAddress._id,
            name: savedAddress.name,
            contactNumber: savedAddress.contactNumber,
            street: savedAddress.street,
            landmark: savedAddress.landmark,
            city: savedAddress.city,
            state: savedAddress.state,
            zipcode: savedAddress.zipcode,
            createdAt: savedAddress.createdAt,
            updatedAt: savedAddress.updatedAt,
            user: {
                _id: requestedUser._id,
                firstName: requestedUser.firstName,
                lastName: requestedUser.lastName,
                email: requestedUser.email,
                contactNumber: requestedUser.contactNumber,
                role: requestedUser.role,
                createdAt: requestedUser.createdAt,
                updatedAt: requestedUser.updatedAt,
            }
        }

        /**
         * Return the success response to the customer
         */
        res.status(201).send(postResponse);
    } catch (err) {
        console.log("Error while Adding Address ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}
