// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js
const sequelize = require("");

module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category ", {
  
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },

})
return Category;
}