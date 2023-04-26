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

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },

        invoice_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },

        NIF: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        Postal_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        amount: {
            type: Sequelize.DECIMAL(4, 2),
            allowNull: false,
        },

        tax_amount: {
            type: Sequelize.DECIMAL(4, 2),
            allowNull: false,
        },

        total: {
            type: Sequelize.DECIMAL(4, 2),
            allowNull: false,
        },

        purchaseID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "purchase_Advert",
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
        Invoice.belongsTo(models.purchase_Advert, {
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