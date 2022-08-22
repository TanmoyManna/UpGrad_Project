/**
 * This will have the logic to route the request related to authentication
 */

const authController = require("../controllers/auth.controller");
const userValidator  = require("../middlewares/user.middleware");

module.exports = (app) => {

    /**
     * Define the route for sign up
     * 
     * POST /eshop/api/v1/auth/signup/users -> auth controller signupUser method
     */
    app.post("/eshop/api/v1/auth/signup/users",[userValidator.validateSignUpReqBody], authController.signupUser);

    /**
     * Define the route for the sign in
     * 
     * POST /eshop/api/v1/auth/signin  -> auth controller sign in method
     */
    app.post("/eshop/api/v1/auth/signin", authController.signin);

}