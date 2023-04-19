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
            references: {
                model: "purchase_Advert_vehicle",
                key: "ID",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Invoice.associate = function(models) {
        Invoice.belongsTo(models.purchase_Advert_vehicle, {
            foreignKey: 'purchaseID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        Invoice.hasMany(models.Payment, {
            foreignKey: 'invoiceID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
        Invoice.hasMany(models.priorityAdvert, {
            foreignKey: 'invoiceID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
    };
    return Invoice
}