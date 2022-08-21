/**
 * This will have the logic to route the request to different controllers
 */

 const authController = require("../controllers/auth.controller");


 module.exports = (app)=>{
 
     /**
      * Define the route for sign up
      * 
      * POST /crm/api/v1/auth/signup/ -> auth controller sign up method
      */
     app.post("/eshop/api/v1/auth/signup/users" , authController.signupUser);
 
     /**
      * Define the route for the sign in
      * 
      * POST /crm/api/v1/auth/signin  -> auth controller sign in method
      */
     app.post("/eshop/api/v1/auth/signin", authController.signin);
 
 }