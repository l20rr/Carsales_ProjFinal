const express = require("express");
const router = express.Router();
const db = require('../models');
const Client = db.client;

router.post("/userData", async(req, res) => {
    const { locality, telem, birthdate, userID } = req.body;

    try {
        console.log(req.body);
        await Client.create({
            locality: locality,
            telem: telem,
            birthdate: birthdate,
            userID: userID
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/client/:id", async(req, res) => {
    const id = req.params.id;

    Client.findByPk(id)
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
        const response = await Client.findAll({
            attributes: ['id', 'userId', 'locality', 'telem', 'birthdate']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});



router.put("/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const num = await Client.update(req.body, {
            where: { ID: id },
        });

        if (num == 1) {
            res.send({
                message: "Client was updated successfully.",
            });
        } else {
            res.send({
                message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Client with id=" + id,
        });
    }
});

router.get("/listlocal/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.price,
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    where client.locality='${id}';`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

module.exports = router;