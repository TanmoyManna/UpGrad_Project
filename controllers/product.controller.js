/**
 * This file will have the logic realted to product
 */
const Product = require("../models/product.model");



/**
 * Create a function to allow the user to add product
 * 
 * If the user is not logged in and tries to access this endpoint we will handle that via the middleware
 * Only Admin will be able to access this endpoint, we will handle that via middleware
 * 
 */
exports.addProduct = async (req, res) => {
    /**
     * First read the request body and create the JS object to be 
     * inserted in the DB
     */
    try {
        const productObj = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            imageUrl: req.body.imageUrl,
        }

        /**
         * Insert  the data in the databse
         */
        const savedProduct = await Product.create(productObj);

        const postResponse = {
            _id: savedProduct._id,
            name: savedProduct.name,
            category: savedProduct.category,
            price: savedProduct.price,
            description: savedProduct.description,
            manufacturer: savedProduct.manufacturer,
            availableItems: savedProduct.availableItems,
            createdAt: savedProduct.createdAt,
            updatedAt: savedProduct.updatedAt,
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

exports.updateProduct = async (req, res) => {
    try {

        /**
         * Fetch the Product object if it's present
         */
        const productToBeUpdated = await Product.findById(req.params.id);

        if (!productToBeUpdated) {
            return res.status(404).send({
                message: `No Product found for ID - ${req.params.id} !`
            })
        }

        const productObj = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            imageUrl: req.body.imageUrl,
        }
        /**
         * Update the product object based on the request
         */
        productObj.name = req.body.name != undefined ? req.body.name : productObj.name;
        productObj.category = req.body.category != undefined ? req.body.category : productObj.category;
        productObj.price = req.body.price != undefined ? req.body.price : productObj.price;
        productObj.description = req.body.description != undefined ? req.body.description : productObj.description;
        productObj.manufacturer = req.body.manufacturer != undefined ? req.body.manufacturer : productObj.manufacturer;
        productObj.availableItems = req.body.availableItems != undefined ? req.body.availableItems : productObj.availableItems;

        /**
         * Save the Product object and return the updated object
         */
        const updatedProduct = await productObj.save();


        const postResponse = {
            _id: updatedProduct._id,
            name: updatedProduct.name,
            category: updatedProduct.category,
            price: updatedProduct.price,
            description: updatedProduct.description,
            manufacturer: updatedProduct.manufacturer,
            availableItems: updatedProduct.availableItems,
            createdAt: updatedProduct.createdAt,
            updatedAt: updatedProduct.updatedAt,
        }
        res.status(200).send(postResponse)
    } catch (err) {
        console.log("Error while Adding Address ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {

        /**
         * Fetch the Product object if it's present
         */
        const productToBeDeleted = await Product.findById(req.params.id);

        if (!productToBeDeleted) {
            return res.status(404).send({
                message: `No Product found for ID - ${req.params.id} !`
            })
        }
        const queryObj = {
            _id: productToBeDeleted._id
        };
        const deleteObj = await Product.deleteOne(queryObj);

        res.status(200).send(`Product with ID - ${req.params.id} deleted successfully!`);
    } catch (err) {
        console.log("Error while Adding Address ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}

exports.getProduct = async (req, res) => {
    try {

        /**
         * Fetch the Product object if it's present
         */
        const productDetails = await Product.findById(req.params.id);

        if (!productDetails) {
            return res.status(404).send({
                message: `No Product found for ID - ${req.params.id} !`
            })
        }

        const postResponse = {
            _id: productDetails._id,
            name: productDetails.name,
            category: productDetails.category,
            price: productDetails.price,
            description: productDetails.description,
            manufacturer: productDetails.manufacturer,
            availableItems: productDetails.availableItems,
            imageUrl: productDetails.imageUrl,
            createdAt: productDetails.createdAt,
            updatedAt: productDetails.updatedAt,
        }
        res.status(200).send(postResponse);
    } catch (err) {
        console.log("Error while Adding Address ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}
