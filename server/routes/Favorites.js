const express = require("express");
const router = express.Router();
const db = require('../models');
const Favorites = db.favorites;

router.post("/favorites", async(req, res) => {
    const { clientID, publishadID } = req.body;

    try {
        console.log(req.body);
        await Favorites.create({
            clientID: clientID,
            publishadID: publishadID
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/Fav/:id", async(req, res) => {
    const id = req.params.id;

    Favorites.findByPk(id)
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


router.delete("/favorites/:id", async (req, res) => {
    const favoriteId = req.params.id;
  
    try {
      const favorite = await Favorites.findByIdAndDelete(favoriteId);
  
      if (!favorite) {
        return res.status(404).json({ msg: "Favorite not found" });
      }
  
      res.status(200).json({ msg: "Favorite deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

router.get("/All", async(req, res) => {
    try {
        const response = await Favorites.findAll({
            attributes: ['ID', 'clientID', 'publishadID']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.get("/listAllFavPriceASC", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName, 
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join favorites on  publishAD.ID=favorites.publishadID
    order by vehicle.price asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listAllFavDateASC", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, vehicle.image2, vehicle.image3, category.categoryName,
    subcategory.SubcategoryName , vehicle.price, vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', 
    vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', vehicle.power, vehicle.num_seats as 'n. lugares', 
    client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join favorites on  publishAD.ID=favorites.publishadID
    order by publishad.publishAD_date asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});


module.exports = router;