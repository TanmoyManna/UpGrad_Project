/**
 * This will have the logic to route the request related to orer
 */

 const orderController = require("../controllers/order.controller");
 const auth = require("../middlewares/authjwt");
 

 module.exports = (app) => {
 
     /**
      * Define the route to add address
      * 
      * POST /eshop/api/v1/orders -> addressController addAddress method
      */
     app.post("/eshop/api/v1/orders",[auth.verifyToken, auth.isUser], orderController.addOrder);
 
 }