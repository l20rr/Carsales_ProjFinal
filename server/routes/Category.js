const express = require("express");
const router = express.Router();
const db = require("../models");
const Category = db.category;


router.get("/subcat", async(req, res) => {
    try {
        const response = await Category.findAll({
            attributes: ['ID', 'categoryName', ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


router.get("/Cat/:id", async(req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Vehicle with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vehicle with id=" + id
            });
        });
});

router.get("/listsubcat/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(`Select category.categoryName, subcategory.SubcategoryName from category inner join subcategory on category.id=subcategory.categoryID where subcategory.ID=${id}`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listlocal/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo',          vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade'   
  from vehicle 
  inner join subcategory on vehicle.subcategoryID=subcategory.ID
  inner join category on subcategory.categoryID=category.ID
  inner join publishAD on  vehicle.ID=publishAD.vehicleID
  inner join client on  publishAD.clientID=client.ID
  where client.locality='${id}';`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listar", async(req, res) => {
    try {
        const response = await db.subcategory.findAll({ include: { model: Category, required: true } });
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = router;