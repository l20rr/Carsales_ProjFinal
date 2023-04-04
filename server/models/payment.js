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
            references: {
                model: "invoice",
                key: "ID",
            },
        },

    })
    Payment.associate = function(models) {
        Payment.belongsTo(models.invoice, { foreignKey: 'invoiceID' })
        Payment.hasMany(models.paypalpayment, {
            as: 'paymentID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Payment.hasMany(models.Creditcardpayment, {
            as: 'paymentID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Payment
}