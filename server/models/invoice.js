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
            type: Sequelize.DATEONLY,
            allowNull: true,
        },

        total: {
            type: Sequelize.DECIMAL(4, 2),
            allowNull: true,
        },

        tax_amount: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        purchaseID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "purchase_Advert_vehicle",
                key: "ID",
            },
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    Invoice.associate = function(models) {
        Invoice.belongsTo(models.purchase_Advert_vehicle)
        Invoice.hasMany(models.Payment, {
            foreignKey: 'invoiceID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Invoice
}