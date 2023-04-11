const express = require("express");
const router = express.Router();
const db = require("../models");
const subcategory = db.subcategory;


router.post("/sub", async (req, res) => {
    const {SubcategoryName} = req.body;
 
    try {
        subcategory.create({
            SubcategoryName:SubcategoryName
        });
        res.status(201).json({msg: "Register "});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
 
});


router.get("/subcat", async (req, res) => {
    try {
        const response = await subcategory.findAll({
            attributes:['ID','SubcategoryName']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  });

  module.exports = router;