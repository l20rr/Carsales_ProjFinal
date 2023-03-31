// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class paypalpayment extends Model {}

paypalpayment.init({
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    paymentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    external_txn_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    client_email_addr: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

})

module.exports = paypalpayment;