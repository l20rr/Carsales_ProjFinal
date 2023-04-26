const express = require("express");
const router = express.Router();
const db = require('../models');
const Invoice = db.invoice;

router.post("/invoice", async(req, res) => {
    const { email, invoice_date, NIF, Postal_code, amount, tax_amount, total, purchaseID } = req.body;

    try {
        console.log(req.body);
        await Invoice.create({
            email: email,
            invoice_date: invoice_date,
            NIF: NIF,
            Postal_code: Postal_code,
            amount: amount,
            tax_amount: tax_amount,
            total: total,
            purchaseID: purchaseID
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    Invoice.findByPk(id)
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
        const response = await Invoice.findAll({
            attributes: ['ID', 'email', 'invoice_date', 'NIF', 'Postal_code', 'amount', 'tax_amount', 'total', 'purchaseID']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = router;