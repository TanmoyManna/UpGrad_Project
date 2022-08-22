/**
 * This will have the logic to route the request related to product
 */

 const productController = require("../controllers/product.controller");


 module.exports = (app) => {
 
     /**
      * Define the route to add product
      * 
      * POST /eshop/api/v1/products -> productController addProduct method
      */
     app.post("/eshop/api/v1/products", productController.addProduct);

      /**
      * Define the route to update product
      * 
      * PUT /eshop/api/v1/products -> productController updateProduct method
      */
     app.put("/eshop/api/v1/products/:id" , productController.updateProduct);

     /**
      * Define the route to delete product
      * 
      * DELETE /eshop/api/v1/products -> productController deleteProduct method
      */
      app.delete("/eshop/api/v1/products/:id" , productController.deleteProduct);


      /**
      * Define the route to get a single product
      * 
      * POST /eshop/api/v1/products -> productController getProduct method
      */
     app.post("/eshop/api/v1/products/:id", productController.getProduct);
 
 }