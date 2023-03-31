// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class payment extends Model {}

payment.init({
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    amount: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
    },

    invoiceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },


})

module.exports = payment;