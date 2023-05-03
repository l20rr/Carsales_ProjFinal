const express = require("express");
const router = express.Router();
const db = require("../models");
const Vehicle = db.vehicle;
const path = require('path');
const fs = require('fs')
const multer = require('multer');
const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post("/addvehicle", async(req, res) => {
    const { price, description, license, subcategoryID, year, kms, brand, model, fuel, power, num_seats } = req.body;

    try {
        const response = await Vehicle.create({
            subcategoryID: subcategoryID,
            image: req.file.filename, // Use req.file.filename para salvar o caminho da imagem no banco de dados
            image2: req.file.filename,
            image3: req.file.filename,
            description: description,
            license: license,
            year: year,
            kms: kms,
            brand: brand,
            model: model,
            fuel: fuel,
            price: price,
            power: power,
            num_seats: num_seats
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.get("/lastImagePath", async(req, res) => {
    try {
        const dirPath = path.join(__dirname, "../uploads");
        const files = await fs.promises.readdir(dirPath);
        const lastFile = files[files.length - 1];
        const lastImagePath = `${lastFile}`; // ou outro caminho de acordo com sua configuração
        res.status(200).json({ lastImagePath });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.get("/vehicle", async(req, res) => {
    try {
        const response = await Vehicle.findAll({
            attributes: ['ID', 'model', 'brand', 'kms', 'year', 'num_seats',
                'price', 'description', 'image', 'image2', 'image3', 'subcategoryID', 'license', 'fuel', 'power'
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


router.get("/vehicle/:id", async(req, res) => {
    const id = req.params.id;

    Vehicle.findByPk(id)
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

// Update a by the id in the request

router.put("/vehicle/:id", async(req, res) => {
    const id = req.params.id;

    Vehicle.update(req.body, {
            where: { ID: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehicle was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vehicle with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vehicle with id=" + id
            });
        });
});


router.delete("/vehicle/:id", async(req, res) => {
    const id = req.params.id;

    Vehicle.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehicle was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vehicle with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Vehicle with id=" + id
            });
        });
});

router.get("/listAno/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName, 
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date  
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    where Year(vehicle.year)='${id}'
    order by vehicle.year asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listKms/:id-:id2", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;
    const id2 = req.params.id2;

    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName, 
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    where vehicle.kms between '${id}' and '${id2}'
    order by vehicle.kms asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listPower/:id-:id2", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;
    const id2 = req.params.id2;

    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName, 
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    where vehicle.power between '${id}' and '${id2}'
    order by vehicle.power asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listRangePriceASC/:id-:id2", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;
    const id2 = req.params.id2;

    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName, 
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    where vehicle.price between '${id}' and '${id2}'
    order by vehicle.price asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listRangeSeatsASC/:id-:id2", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;
    const id2 = req.params.id2;

    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName, 
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date 
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    where vehicle.num_seats between '${id}' and '${id2}'
    order by vehicle.num_seats ASC;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listByBrandASC/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;


    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName, 
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    where vehicle.brand='${id}'
    order by vehicle.model;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listByModeldASC/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;


    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName, 
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    where vehicle.model='${id}'
    order by publishad.publishAD_date asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});


module.exports = router;