const express = require("express");
const router = express.Router();
const db = require('../models');
const PayPalPayment = db.paypalpayment;

router.post("/paypal", async(req, res) => {
    const { paymentID, external_txn_id, client_email_addr } = req.body;

    try {
        console.log(req.body);
        await PayPalPayment.create({
            paymentID: paymentID,
            external_txn_id: external_txn_id,
            client_email_addr: client_email_addr
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    PayPalPayment.findByPk(id)
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
        const response = await PayPalPayment.findAll({
            attributes: ['ID', 'paymentID', 'external_txn_id', 'client_email_addr']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = router;