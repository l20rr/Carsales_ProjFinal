const express = require("express");
const router = express.Router();
const db = require("../models");
const subcategory = db.subcategory;

  router.get("/subAll/:id", async (req, res) => {
    const categoryID = req.params.id;
    try {
        const response = await subcategory.findAll({ where: { categoryID:categoryID } });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  });

router.get("/subcat", async (req, res) => {
    try {
        const response = await subcategory.findAll({
            attributes:['ID','categoryID','SubcategoryName']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  });

  module.exports = router;