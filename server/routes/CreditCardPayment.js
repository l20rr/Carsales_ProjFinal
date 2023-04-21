const express = require("express");
const router = express.Router();
const db = require('../models');
const CreditCardPayment = db.creditcardpayment;

router.post("/creditcard", async(req, res) => {
    const { paymentID, creditcard_num, creditcard_security_code, creditcard_expiration_date } = req.body;

    try {
        console.log(req.body);
        await CreditCardPayment.create({
            paymentID: paymentID,
            creditcard_num: creditcard_num,
            creditcard_security_code: creditcard_security_code,
            creditcard_expiration_date: creditcard_expiration_date
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    CreditCardPayment.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                console.log("error")
                res.status(404).send({
                    message: `Cannot find with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving  with id=" + id
            });
        });
});


router.get("/All", async(req, res) => {
    try {
        const response = await CreditCardPayment.findAll({
            attributes: ['ID', 'paymentID', 'creditcard_num', 'creditcard_security_code', 'creditcard_expiration_date']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = router;