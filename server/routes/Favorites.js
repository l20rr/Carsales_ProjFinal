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

router.get('/favorites/:id', async (req, res) => {
    const { QueryTypes } = require('sequelize');
    const userID = req.params.id;
  
    const response = await db.sequelize.query(`
      SELECT *
      FROM vehicle
      INNER JOIN subcategory ON vehicle.subcategoryID = subcategory.ID
      INNER JOIN category ON subcategory.categoryID = category.ID
      INNER JOIN publishAD ON vehicle.ID = publishAD.vehicleID
      INNER JOIN favorites ON publishAD.ID = favorites.publishadID
      INNER JOIN client ON publishAD.clientID = client.ID
      INNER JOIN user ON user.id = client.userID
      WHERE favorites.clientID = '${userID}'
      ORDER BY vehicle.price DESC;
    `, { type: QueryTypes.SELECT });
  
    res.status(200).json(response);
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


router.delete("/favorites/:vehicleID", async (req, res) => {
    const vehicleID = req.params.vehicleID;
  
    try {
      await Favorites.destroy({
        where: { publishadID: vehicleID }
      });
      res.send({
        message: "Favorite was deleted successfully!"
      });
    } catch (error) {
      res.status(500).send({
        message: "Could not delete Favorite with publishadID=" + vehicleID
      });
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

router.get("/listAllFavPriceASC/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(`Select *   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join favorites on  publishAD.ID=favorites.publishadID
    inner join client on  publishAD.clientID=client.ID
    inner join user on user.id=client.userID
    where favorites.clientID='${id}'
    order by vehicle.price desc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});


module.exports = router;