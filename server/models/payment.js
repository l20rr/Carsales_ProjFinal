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

        CredCard: {
            type: Sequelize.BIGINT(11),
            allowNull: false,
        },

        CredCard_date: {
            type: Sequelize.DATEONLY,
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

    };
    return Payment
}