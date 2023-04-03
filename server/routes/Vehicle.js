const express = require("express");
const router = express.Router();
const db = require("../models");
const Vehicle = db.vehicle;


router.post("/addvehicle", async (req, res) => {
    const {license, year, kms, brand,model,fuel,power,num_seats} = req.body;
 
    try {
         Vehicle.create({
            license: license,
            year: year,
            kms: kms,
            brand:brand,
            model:model,
            fuel:fuel,
           power:power,
           num_seats:num_seats
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
 
});

router.get("/vehicle", async (req, res) => {
    const {name, email, password, confPassword} = req.body;
    try {
        const response = await Vehicle.findAll({
            attributes:['ID','model','brand','kms','year','num_seats']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  });


  router.get("/vehicle/:id", async (req, res) => {
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

  router.put("/vehicle/:id", async (req, res) => {
    const id = req.params.id;
  
    Vehicle.update(req.body, {
      where: { id: id }
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


  router.delete("/vehicle/:id", async (req, res) => {
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
  
  

module.exports = router;
