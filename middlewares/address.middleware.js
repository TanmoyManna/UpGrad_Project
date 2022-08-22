const contactNumberRegexp = /^[0-9]{10,10}$/;
const zipRegexp = /^[0-9]{6,6}$/;

const validateAddressReqBody = (req, res, next) => {

    // Check if all required things are present
    if (!req.body.name) {
        return res.status(400).send({
            message: "name is missing"
        })
    }
    if (!req.body.contactNumber) {
        return res.status(400).send({
            message: "contact Number is missing"
        })
    }
    if (!req.body.street) {
        return res.status(400).send({
            message: "street is missing"
        })
    }
    if (!req.body.landmark) {
        return res.status(400).send({
            message: "landmark is missing"
        })
    }
    if (!req.body.city) {
        return res.status(400).send({
            message: "city is missing"
        })
    }
    if (!req.body.state) {
        return res.status(400).send({
            message: "state is missing"
        })
    }
    if (!req.body.zipCode) {
        return res.status(400).send({
            message: "zipCode is missing"
        })
    }

    if (!contactNumberRegexp.test(req.body.contactNumber)) {
        return res.status(400).send({
            message: "Invalid contact number!"
        });
    }
    if (!zipRegexp.test(req.body.zipCode)) {
        return res.status(400).send({
            message: "Invalid zip code!"
        });
    }
    next();
}

module.exports = {
    validateAddressReqBody: validateAddressReqBody
}