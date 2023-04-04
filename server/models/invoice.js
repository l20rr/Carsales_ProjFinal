// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js

module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define("invoice", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        invoice_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },

        total: {
            type: Sequelize.DECIMAL(4, 2),
            allowNull: false,
        },

        tax_amount: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        purchaseID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    })
    Invoice.associate = function(models) {
        Invoice.belongsTo(models.Purchase_advert, { foreignKey: 'purchaseID' })
        Invoice.hasMany(models.Payment, { as: 'invoiceID' })
    };
    return Invoice
}