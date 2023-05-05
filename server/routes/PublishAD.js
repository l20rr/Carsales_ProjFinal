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
    const response = await db.sequelize.query(`SELECT 
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
    vehicle.num_seats AS "n. lugares", 
    client.locality, 
    publishAD.publishAD_date ,
    publishad.ID AS 'ID'
    
  FROM 
    vehicle 
    INNER JOIN subcategory ON vehicle.subcategoryID = subcategory.ID
    INNER JOIN category ON subcategory.categoryID = category.ID
    INNER JOIN publishAD ON vehicle.ID = publishAD.vehicleID
    INNER JOIN client ON publishAD.clientID = client.ID;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

// Definir a rota com os parâmetros de marca e modelo
router.get("/listAllAD/:brand/:model", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    // Extrair os parâmetros de marca e modelo da URL
    const { brand, model } = req.params;

    // Consulta SQL com cláusula WHERE para filtrar por marca e modelo
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
        replacements: { brand, model } // Substituir os parâmetros na consulta
    });

    res.status(200).json(response);
});

router.get("/listAD/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(
        `SELECT User.id AS user_id, User.streamChatUserId AS user_idChat ,user.fullname, vehicle.image, vehicle.image2, vehicle.image3, 
        category.categoryName, subcategory.SubcategoryName, vehicle.price, vehicle.description, vehicle.id AS 'id', vehicle.year, vehicle.kms, 
        vehicle.brand AS 'Marca', vehicle.model AS 'Modelo', vehicle.fuel AS 'Combustivel', vehicle.power, vehicle.num_seats AS 'num_seats', 
        client.locality AS 'Localidade', publishad.publishAD_date   
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

    const response = await db.sequelize.query(`SELECT User.id AS user_id, User.streamChatUserId AS user_idChat ,user.fullname, vehicle.image, vehicle.image2, vehicle.image3, 
        category.categoryName, subcategory.SubcategoryName, vehicle.price, vehicle.description, vehicle.id AS 'id', vehicle.year, vehicle.kms, 
        vehicle.brand AS 'Marca', vehicle.model AS 'Modelo', vehicle.fuel AS 'Combustivel', vehicle.power, vehicle.num_seats AS 'num_seats', 
        client.locality AS 'Localidade', publishad.publishAD_date , publishad.ID AS 'ID'
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

    const response = await db.sequelize.query(`SELECT User.id AS user_id, User.streamChatUserId AS user_idChat ,user.fullname, vehicle.image, vehicle.image2, vehicle.image3, 
        category.categoryName, subcategory.SubcategoryName, vehicle.price, vehicle.description, vehicle.id AS 'id', vehicle.year, vehicle.kms, 
        vehicle.brand AS 'Marca', vehicle.model AS 'Modelo', vehicle.fuel AS 'Combustivel', vehicle.power, vehicle.num_seats AS 'num_seats', 
        client.locality AS 'Localidade', publishad.publishAD_date   
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