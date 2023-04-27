const express = require("express");
const router = express.Router();
const db = require('../models');
const { where } = require("sequelize");
const PublishAD = db.publishAD;
const Vehicle = db.vehicle
const Client = db.client


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
/*
router.get("/publish/publishad", async (req, res) => {
    try {
      const publishAds = await db.publishAD.findAll({
        attributes: ["publishAD_date"],
        include: [
          {
            model: db.client,
            attributes: ["locality", "telem"]
          },
          {
            model: db.vehicle,
            attributes: [
              "model",
              "brand",
              "kms",
              "year",
              "num_seats",
              "price",
              "description",
              "image",
              "subcategoryID",
              "license",
              "fuel",
              "power"
            ]
          }
        ]
      });
      res.status(200).json(publishAds);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
*/
  
router.get('/all', async (req, res) => {
    try {
      const publishads = await PublishAD.findAll({
        include: [
          {
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
    const list = await db.vehicle.findAll({
        attributes: ['model', 'brand', 'kms', 'year', 'num_seats', 'price', 'description', 'image', 'subcategoryID', 'license', 'fuel', 'power'],
        include: [{
            model: db.client,
            attributes: ['locality', 'telem'],
            through: {
                model: db.publishAD
            }
        }],
        order: [
    [db.publishAD, 'publishAD_date', 'DESC']
]
    });
    res.status(200).json(list);
});


router.get("/ListPricePublishAsc", async(req, res) => {
    const list = await db.vehicle.findAll({
        attributes: ['model', 'brand', 'kms', 'year', 'num_seats', 'price', 'description', 'image', 'subcategoryID', 'license', 'fuel', 'power'],
        include: [{
            model: db.client,
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
    const list = await db.vehicle.findAll({
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
    const list = await db.vehicle.findAll({
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