const express = require("express");
const router = express.Router();
const db = require('../models');
const Client = db.client;

router.post("/userData", async (req, res) => {
    const {locality, telem, birthdate} = req.body;
 
    try {
         await Client.create({
            locality: locality,
            telem: telem,
            birthdate: birthdate,
        });

        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
 
});

router.put("/client/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
        const num = await Client.update(req.body, {
          where: { userID: id },
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