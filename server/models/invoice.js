// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class invoice extends Model {}

invoice.init({
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    invoice_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    total: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
    },

    tax_amount: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    purchaseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },


})

module.exports = invoice;