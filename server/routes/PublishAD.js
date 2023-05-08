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


router.get("/listAllAD/:brand/:model", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    
    const { brand, model } = req.params;

   
    const response = await db.sequelize.query(`
        SELECT 
            vehicle.image,
            vehicle.image2, 
            vehicle.image3, 
            vehicle.id AS id, 
            category.categoryName, 
            subcategory.SubcategoryName, 
            vehicle.price,
            vehicle.license, 
            vehicle.year, 
            vehicle.kms, 
            vehicle.brand AS Marca, 
            vehicle.model AS Modelo, 
            vehicle.fuel AS Combustivel, 
            vehicle.power, 
            vehicle.num_seats AS "num_seats", 
            client.locality, 
            publishAD.publishAD_date,
            publishad.ID AS 'ID'
        FROM 
            vehicle 
            INNER JOIN subcategory ON vehicle.subcategoryID = subcategory.ID
            INNER JOIN category ON subcategory.categoryID = category.ID
            INNER JOIN publishAD ON vehicle.ID = publishAD.vehicleID
            INNER JOIN client ON publishAD.clientID = client.ID
        WHERE
            vehicle.brand = :brand AND vehicle.model = :model
    `, {
        type: QueryTypes.SELECT,
        replacements: { brand, model }
    });

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
router.get('/filter', async (req, res) => {
    const { QueryTypes } = require('sequelize');
    const { brand, model, category, subcategory, fuel, sort } = req.query;
    
    let query = `
      SELECT 
        vehicle.image,
        vehicle.image2, 
        vehicle.image3, 
        vehicle.id AS id, 
        category.categoryName, 
        subcategory.SubcategoryName, 
        vehicle.price,
        vehicle.license, 
        vehicle.year, 
        vehicle.kms, 
        vehicle.brand AS Marca, 
        vehicle.model AS Modelo, 
        vehicle.fuel AS Combustivel, 
        vehicle.power, 
        vehicle.num_seats AS "num_seats", 
        client.locality, 
        publishad.publishAD_date,
        publishad.ID AS 'ID'
      FROM 
        vehicle 
        INNER JOIN subcategory ON vehicle.subcategoryID = subcategory.ID
        INNER JOIN category ON subcategory.categoryID = category.ID
        INNER JOIN publishad ON vehicle.ID = publishad.vehicleID
        INNER JOIN client ON publishad.clientID = client.ID
      WHERE
        (:brand IS NULL OR vehicle.brand = :brand)
        OR (:model IS NULL OR vehicle.model = :model)
        OR (:category IS NULL OR category.categoryName = :category)
        OR (:subcategory IS NULL OR subcategory.SubcategoryName = :subcategory)
        OR (:fuel IS NULL OR vehicle.fuel = :fuel)
    `;
    
    const replacements = { brand, model, category, subcategory, fuel, sort };
    
    // atribua o valor padrão null ao parâmetro "fuel" se ele não existir no objeto "req.query"
    if (!req.query.hasOwnProperty('fuel')) {
      replacements.fuel = null;
    }
    
    if (sort === 'asc') {
      query += ` ORDER BY vehicle.price ASC`;
    } else if (sort === 'desc') {
      query += ` ORDER BY vehicle.price DESC`;
    }
    
    const response = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements,
    });
    
    res.status(200).json(response);
  });



module.exports = router;