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
            type: Sequelize.DATEONLY,
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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Payment.associate = function(models) {
        Payment.belongsTo(models.invoice, {
            foreignKey: 'invoiceID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        Payment.hasMany(models.paypalpayment, {
            foreignKey: 'paymentID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
        Payment.hasMany(models.Creditcardpayment, {
            foreignKey: 'paymentID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
    };
    return Payment
}