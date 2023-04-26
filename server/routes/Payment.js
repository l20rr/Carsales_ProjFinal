const express = require("express");
const router = express.Router();
const db = require('../models');
const Payment = db.payment;

router.post("/payment", async(req, res) => {
    const { CredCard, CredCard_date, invoiceID } = req.body;

    try {
        console.log(req.body);
        await Payment.create({
            CredCard: CredCard,
            CredCard_date: CredCard_date,
            invoiceID: invoiceID
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    Payment.findByPk(id)
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
        const response = await Payment.findAll({
            attributes: ['ID', 'CredCard', 'CredCard_date', 'invoiceID']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = router;