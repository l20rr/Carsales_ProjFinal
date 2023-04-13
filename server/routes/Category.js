const express = require("express");
const router = express.Router();
const db = require("../models");
const Category = db.category;


router.post("/addCat", async (req, res) => {
    const {categoryName} = req.body;
 
    try {
        Category.create({
            categoryName:categoryName
        });
        res.status(201).json({msg: "Register"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
 
});

router.get("/Cat", async (req, res) => {
    try {
        const response = await Category.findAll({
            attributes:['ID','categoryName']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  });


  router.get("/Cat/:id", async (req, res) => {
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

  module.exports = router;
