// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class subcategory extends Model {}

subcategory.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    categoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "ID",
      },
    },

})

module.exports = subcategory;