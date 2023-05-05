const express = require("express");
const router = express.Router();
const db = require('../models');
const Invoice = db.invoice;

router.post("/invoice", async(req, res) => {
    const { email, invoice_date, NIF, Postal_code, amount, tax_amount, total, purchaseID } = req.body;

    try {
        console.log(req.body);
        const response = await Invoice.create({
            email: email,
            invoice_date: invoice_date,
            NIF: NIF,
            Postal_code: Postal_code,
            amount: amount,
            tax_amount: tax_amount,
            total: total,
            purchaseID: purchaseID
        });

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/Invoice/:id", async(req, res) => {
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

router.get("/listInvoice/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(`select *   
    from client
    inner join publishAD on  client.ID=publishad.clientID
    inner join purchase_advert on  publishAD.ID=purchase_advert.publishadID
    inner join invoice on purchase_advert.ID=invoice.purchaseID
    inner join payment on invoice.ID=payment.invoiceID
    where client.id='${id}';`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});


module.exports = router;