const express = require("express");
const router = express.Router();
const db = require('../models');
const PublishAD = db.publishAD;
const vehicle = db.vehicle;
const client = db.client;
const { where } = require("sequelize");


router.post("/publishad", async(req, res) => {
    const { vehicleID, clientID, publishAD_date } = req.body;

    try {
        console.log(req.body);
        await PublishAD.create({
            vehicleID: vehicleID,
            clientID: clientID,
            publishAD_date: publishAD_date
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/publish/:id", async(req, res) => {
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
            attributes: ['id', 'vehicleID', 'clientID', 'publishAD_date']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.get("/ListPricePublishDesc", async(req, res) => {
    const list = await PublishAD.findAll({
        include: [{
            model: vehicle,
            include: [
                client
            ]
        }],
    });
    res.status(200).json(list);
});

router.get("/ListPricePublishAsc", async(req, res) => {
    const list = await vehicle.findAll({
        attributes: ['model', 'brand', 'kms', 'year', 'num_seats', 'price', 'description', 'image', 'subcategoryID', 'license', 'fuel', 'power'],
        include: [{
            model: client,
            attributes: ['locality', 'telem'],
            through: {
                model: db.publishAD
            }
        }],
        order: [
            [db.vehicle, '$vehicle.price$', 'ASC']
        ]
    });
    res.status(200).json(list);
});

router.get("/ListDatePublishDesc", async(req, res) => {
    const list = await vehicle.findAll({
        attributes: ['model', 'brand', 'kms', 'year', 'num_seats', 'price', 'description', 'image', 'subcategoryID', 'license', 'fuel', 'power'],
        include: [{
            model: db.client,
            attributes: ['locality', 'telem'],
            through: {
                model: db.publishAD,
                attributes: ['publishAD_date']
            }
        }],
        order: [
            [db.publishAD, '$publishAD.publishAD_date$', 'DESC']
        ]
    });
    res.status(200).json(list);
});

router.get("/ListDatePublishAsc", async(req, res) => {
    const list = await vehicle.findAll({
        attributes: ['model', 'brand', 'kms', 'year', 'num_seats', 'price', 'description', 'image', 'subcategoryID', 'license', 'fuel', 'power'],
        include: [{
            model: db.client,
            attributes: ['locality', 'telem'],
            through: {
                model: db.publishAD,
                attributes: ['publishAD_date']
            }
        }],
        order: [
            [db.publishAD, '$publishAD.publishAD_date$', 'ASC']
        ]
    });
    res.status(200).json(list);
});


module.exports = router;