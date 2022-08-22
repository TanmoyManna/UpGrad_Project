const User = require("../models/user.model");
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const contactNumberRegexp = /^[0-9]{10,10}$/;

const validateSignUpReqBody = (req, res, next) => {

    // Check if all required things are present
    if (!req.body.email) {
        return res.status(400).send({
            message: "Email of the User is missing"
        })
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "Password of the User is missing"
        });
    }
    if (!req.body.first_name) {
        return res.status(400).send({
            message: "First name of the User is missing"
        });
    }
    if (!req.body.last_name) {
        return res.status(400).send({
            message: "Last name of the User is missing"
        });
    }
    if (!req.body.contactNumber) {
        return res.status(400).send({
            message: "Contact number of the User is missing"
        });
    }

    if (!emailRegexp.test(req.body.email)) {
        return res.status(400).send({
            message: "Invalid email format!"
        });
    }
    const user = User.findOne({email:req.body.email})
    if (user) {
        return res.status(400).send({
            message: "Try any other email, this email is already registered!"
        });
    }
    if (!contactNumberRegexp.test(req.body.contactNumber)) {
        return res.status(400).send({
            message: "Invalid contact number!"
        });
    }
    next();
}

module.exports = {
    validateSignUpReqBody: validateSignUpReqBody
}