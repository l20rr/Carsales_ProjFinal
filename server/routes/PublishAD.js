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
router.get("/listAll", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , 
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade'   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get('/all', async(req, res) => {
    try {
        const response = await PublishAD.findAll({
            attributes: ['id', 'vehicleID', 'clientID', 'publishAD_date']
        });
        res.status(200).json(response);
        const publishads = await PublishAD.findAll({
            include: [{
                    model: Vehicle,
                    attributes: [
                        'model',
                        'brand',
                        'kms',
                        'year',
                        'num_seats',
                        'price',
                        'description',
                        'image',
                        'subcategoryID',
                        'license',
                        'fuel',
                        'power',
                    ],
                },
                {
                    model: Client,
                    attributes: ['locality', 'telem'],
                },
            ],
        });

        res.status(200).json(publishads);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        order: [
            [db.publishAD, 'publishAD_date', 'DESC']
        ]
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
            [db.publishAD, 'publishAD_date', 'DESC']
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