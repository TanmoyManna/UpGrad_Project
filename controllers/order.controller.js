/**
 * This file will have the logic realted to address
 */
const Order = require("../models/order.model");
const Address = require("../models/address.model");
const Product = require("../models/product.model");


/**
 * Create a function to allow the user to add oders  * 
 */
exports.addOrder = async (req, res) => {
    /**
     * First read the request body and create the JS object to be 
     * inserted in the DB
     */
    try {

        const orderedProuct = await Product.findOne({_id : req.body.productId});
        if (!orderedProuct) {
            return res.status(404).send({
                message: `No Product found for ID - ${req.body.productId} !`
            });
        }
        const deliveryAddress = await Address.findOne({_id : req.body.addressId});
        console.log(deliveryAddress);
        if (!deliveryAddress) {
            return res.status(404).send({
                message: `No Address  found for ID - ${req.body.addressId} !`
            });
        }

        if (!orderedProuct.availableItems || req.body.quantity > orderedProuct.availableItems) {
            return res.status(404).send({
                message: `Product with ID - ${req.body.productId} is currently out of stock!`
            });
        }

        const orderObj = {
            productId: req.body.productId,
            addressId: req.body.addressId,
            quantity: req.body.quantity,
        }
        /**
         * Insert  the data in the databse
         */
        const savedOdered = await Order.create(orderObj);

        orderedProuct.availableItems = orderedProuct.availableItems - req.body.quantity;
        await orderedProuct.save();

        const postResponse = {
            addressId: savedOdered.addressId,
            productId: savedOdered.productId,
            quantity: savedOdered.quantity,
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
