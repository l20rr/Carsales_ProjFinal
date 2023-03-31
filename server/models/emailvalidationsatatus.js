// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class emailvalidationsatatus extends Model {}

emailvalidationsatatus.init({
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    status_name: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    status_description: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

})

module.exports = emailvalidationsatatus;