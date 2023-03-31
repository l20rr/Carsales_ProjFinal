// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class purchase_advert extends Model {}

purchase_advert.init({
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    clientID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    advertID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

})

module.exports = purchase_advert;