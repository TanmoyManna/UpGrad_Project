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
        /**
         * Update the product object based on the request
         */
        productToBeUpdated.name = req.body.name != undefined ? req.body.name : productToBeUpdated.name;
        productToBeUpdated.category = req.body.category != undefined ? req.body.category : productToBeUpdated.category;
        productToBeUpdated.price = req.body.price != undefined ? req.body.price : productToBeUpdated.price;
        productToBeUpdated.description = req.body.description != undefined ? req.body.description : productToBeUpdated.description;
        productToBeUpdated.manufacturer = req.body.manufacturer != undefined ? req.body.manufacturer : productToBeUpdated.manufacturer;
        productToBeUpdated.availableItems = req.body.availableItems != undefined ? req.body.availableItems : productToBeUpdated.availableItems;

        /**
         * Save the Product object and return the updated object
         */
        const updatedProduct = await productToBeUpdated.save();


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
exports.getProducts = async (req, res) => {
    try {
        /**
         * Read the query params if any
         */
        const queryObj = {};
        const sortObj = {};

        const productCategory = req.query.category;
        if (productCategory) {
            queryObj.category = productCategory;
        }
        const productName = req.query.name;
        if (productName) {
            queryObj.name = productName;
        }

        const sortBy = req.query.sortBy;
        if (sortBy) {
            sortObj[`${sortBy}`] = 1;
        }
        const direction = req.query.direction;
        if (direction == 'DESC') {
            sortObj[`${sortBy}`] = -1;
        }
        const allProucts = await Product.find(queryObj).sort(sortObj);



        res.status(200).send({ content: allProucts, filter: queryObj, sortBy: sortObj });

    } catch (err) {
        console.log("Error while Adding Address ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}
exports.getProductCategories = async (req, res) => {
    try {
        const allCategories = await Product.aggregate([[{ "$group": { _id: "$_id", category: { $first: "$category" } } }]]);

        const onlyCategories = [];

        allCategories.forEach(element => {
            onlyCategories.push(element.element);
        });
        res.status(200).send(allCategories);
    } catch (err) {
        console.log("Error while Adding Address ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}