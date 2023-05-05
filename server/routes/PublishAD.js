const express = require("express");
const router = express.Router();
const db = require('../models');
const PublishAD = db.publishAD;
const { where } = require("sequelize");


router.post("/publishad", async(req, res) => {
    const { vehicleID, clientID, publishAD_date } = req.body;

    try {
        console.log(req.body);
        const response = await PublishAD.create({
            vehicleID: vehicleID,
            clientID: clientID,
            publishAD_date: publishAD_date
        });

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/listAllAD", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const response = await db.sequelize.query(`SELECT * 
  FROM vehicle 
    INNER JOIN subcategory ON vehicle.subcategoryID = subcategory.ID
    INNER JOIN category ON subcategory.categoryID = category.ID
    INNER JOIN publishAD ON vehicle.ID = publishAD.vehicleID
    INNER JOIN client ON publishAD.clientID = client.ID;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listAD/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(
        `SELECT *  
      FROM vehicle 
      INNER JOIN subcategory ON vehicle.subcategoryID = subcategory.ID
      INNER JOIN category ON subcategory.categoryID = category.ID
      INNER JOIN publishAD ON vehicle.ID = publishAD.vehicleID
      INNER JOIN client ON publishAD.clientID = client.ID
      INNER JOIN User ON User.id = client.userID
      WHERE vehicle.id = ${id}`, { type: QueryTypes.SELECT });

    res.status(200).json(response);
});


router.get("/listAllADPriceASC", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`SELECT *  
        FROM vehicle 
        INNER JOIN subcategory ON vehicle.subcategoryID = subcategory.ID
        INNER JOIN category ON subcategory.categoryID = category.ID
        INNER JOIN publishAD ON vehicle.ID = publishAD.vehicleID
        INNER JOIN client ON publishAD.clientID = client.ID
        INNER JOIN User ON User.id = client.userID
        order by vehicle.price asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listAllADDateASC", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`SELECT *  
        FROM vehicle 
        INNER JOIN subcategory ON vehicle.subcategoryID = subcategory.ID
        INNER JOIN category ON subcategory.categoryID = category.ID
        INNER JOIN publishAD ON vehicle.ID = publishAD.vehicleID
        INNER JOIN client ON publishAD.clientID = client.ID
        INNER JOIN User ON User.id = client.userID
        order by publishad.publishAD_date asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});




module.exports = router;