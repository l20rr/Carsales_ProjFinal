const express = require("express");
const router = express.Router();
const db = require('../models');
const PriorityAdvert = db.priorityAdvert;

router.post("/priorityadvert", async(req, res) => {
    const { advertID, invoiceID } = req.body;

    try {
        console.log(req.body);
        await PriorityAdvert.create({
            advertID: advertID,
            invoiceID: invoiceID
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    PriorityAdvert.findByPk(id)
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
        const response = await PriorityAdvert.findAll({
            attributes: ['ID', 'advertID', 'invoiceID']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = router;