/**
 * This will have the logic to route the request related to address
 */

 const addressController = require("../controllers/address.controller");
 const auth = require("../middlewares/authjwt");
 const addressesValidator  = require("../middlewares/address.middleware");
 

 module.exports = (app) => {
 
     /**
      * Define the route to add address
      * 
      * POST /eshop/api/v1/address -> addressController addAddress method
      */
     app.post("/eshop/api/v1/addresses",[auth.verifyToken, addressesValidator.validateAddressReqBody], addressController.addAddress);
 
 }