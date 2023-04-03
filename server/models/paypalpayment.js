// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js

module.exports = (sequelize, Sequelize) => {
    const Paypalpayment = sequelize.define("paypalpayment", {
    ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    paymentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    external_txn_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    client_email_addr: {
        type: Sequelize.STRING,
        allowNull: false,
    },

})
return Paypalpayment
}
