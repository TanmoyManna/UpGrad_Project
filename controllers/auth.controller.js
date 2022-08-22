/**
 * This file will have the logic to signup and signin users
 */
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");



/**
 * Create a function to allow the user to sign 
 * 
 * we will do the req body validation like unique email,user_name correct format of email and contactNumber in the middleware
 *
 */
exports.signupUser = async (req, res) => {
    /**
     * First read the request body and create the JS object to be 
     * inserted in the DB
     */
    try {
        const userObj = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: bcrypt.hashSync(req.body.password, 8),
            contactNumber: req.body.contactNumber,
            user_name: req.body.user_name,
        }

        /**
         * Insert  the data in the databse
         */
        const savedUser = await User.create(userObj);

        const postResponse = {
            email: savedUser.email,
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            user_name: savedUser.user_name,
            _id: savedUser._id,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        }

        /**
         * Return the success response to the customer
         */
        res.status(201).send(postResponse);
    } catch (err) {
        console.log("Error while registering user ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}


/**
 * Controller code for the login
 */
exports.signin = async (req, res) => {
    try {

        /**
         * Read the userId and password from the request
         */
        const emailFromReq = req.body.userId;
        const passwordFromReq = req.body.password;

        /**
         * Ensure the userId is valid
         */
        const userSaved = await User.findOne({ email: emailFromReq });

        if (!userSaved) {
            return res.status(404).send({
                message: "This email has not been registered!"
            })
        }

        /**
         * Ensure that the password passed is valid
         * In DB we have encrypted password
         * So we need 
         */
        const isValidPassword = bcrypt.compareSync(passwordFromReq, userSaved.password);

        if (!isValidPassword) {
            return res.status(401).send({
                message: "Invalid Credentials!"
            })
        }

        /**
         * We need to generate the access token ( JWT based )
         */
        const token = jwt.sign({
            id: userSaved._id
        }, authConfig.secret, {
            expiresIn: 900
        })

        /**
         * Send the response back
         */

        res.status(200).send({            
            email: userSaved.email,
            name: userSaved.first_name +' '+ userSaved.last_name,
            user_name: userSaved.user_name,
            accessToke: token,
        });

    } catch (err) {
        console.log("Error while login ", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }

}