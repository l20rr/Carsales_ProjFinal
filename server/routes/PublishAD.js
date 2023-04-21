const express = require("express");
const router = express.Router();
const db = require('../models');
const PublishAD = db.publishAD;

router.post("/publishad", async(req, res) => {
    const { Advert_vehicleID, clientID } = req.body;

    try {
        console.log(req.body);
        await PublishAD.create({
            Advert_vehicleID: Advert_vehicleID,
            clientID: clientID
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    PublishAD.findByPk(id)
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
        const response = await PublishAD.findAll({
            attributes: ['ID', 'Advert_vehicleID', 'clientID']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = router;