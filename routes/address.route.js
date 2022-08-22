/**
 * This will have the logic to route the request related to address
 */

 const addressController = require("../controllers/address.controller");


 module.exports = (app) => {
 
     /**
      * Define the route to add address
      * 
      * POST /eshop/api/v1/address -> addressController addAddress method
      */
     app.post("/eshop/api/v1/addresses", addressController.addAddress);
 
 }