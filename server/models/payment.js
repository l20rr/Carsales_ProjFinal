// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js

module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
    ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    payment_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    amount: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
    },

    invoiceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
 
})
return Payment
}
