// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class hashalgo extends Model {}

hashalgo.init({
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    hash_name: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

})

module.exports = hashalgo;