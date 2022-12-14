/**
 * Middlware to validate the access token
 */

const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const userModel = require("../models/user.model");

const verifyToken = (req, res, next) => {

    /**
     * if the token is present
     */
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).send({
            message: "Please login first to access this endpoint!"
        });
    }
    /**
     * if the token is valid
     */
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Invalid token"
            });
        }
        console.log("Token is valid");

        /**
         * Fetch the userId from token and set it to the request object
         */
        req.userId = decoded.id; //  decoded.id is the userId
        next();
    })

}



/**
 * Middleware to go and check if the user is ADMIN
 */
const isAdmin = async (req, res, next) => {

    const user = await userModel.findById(req.userId);

    if (user && user.user_role == "ADMIN") {
        next();
    } else {
        return res.status(403).send({
            message: "You are not authorised to access this endpoint!"
        })
    }
}

/**
 * Middleware to go and check if the user is USER
 */
 const isUser = async (req, res, next) => {

    const user = await userModel.findById(req.userId);

    if (user && user.user_role == "USER") {
        next();
    } else {
        return res.status(403).send({
            message: "You are not authorised to access this endpoint."
        })
    }
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isUser: isUser
}