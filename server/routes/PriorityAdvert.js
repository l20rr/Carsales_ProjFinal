const express = require("express");
const router = express.Router();
const db = require('../models');
const PriorityAdvert = db.priorityAdvert;

router.post("/priorityadvert", async(req, res) => {
    const { publishadID, invoiceID, priorityAD_date } = req.body;

    try {
        console.log(req.body);
        await PriorityAdvert.create({
            publishadID: publishadID,
            invoiceID: invoiceID,
            priorityAD_date: priorityAD_date
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/listPriority/:id", async(req, res) => {
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
            attributes: ['ID', 'publishadID', 'invoiceID', 'priorityAD_date']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.get("/listAllPriority", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.price,
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade', publishad.publishAD_date  
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join priorityadvert on  publishAD.ID=priorityadvert.publishadID
    inner join client on  publishAD.clientID=client.ID
    order by priorityadvert.ID;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listAllPriorityPriceASC", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.price,
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    left join subcategory on vehicle.subcategoryID=subcategory.ID
    left join category on subcategory.categoryID=category.ID
    left join publishAD on  vehicle.ID=publishAD.vehicleID
    left join client on  publishAD.clientID=client.ID
    left join priorityadvert  on  publishAD.ID=priorityadvert.publishadID
    order by priorityadvert.ID desc, vehicle.price desc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listAllPriorityDateASC", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.price,
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    left join subcategory on vehicle.subcategoryID=subcategory.ID
    left join category on subcategory.categoryID=category.ID
    left join publishAD on  vehicle.ID=publishAD.vehicleID
    left join client on  publishAD.clientID=client.ID
    left join priorityadvert  on  publishAD.ID=priorityadvert.publishadID
    order by priorityadvert.ID desc, publishad.publishAD_date desc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

module.exports = router;