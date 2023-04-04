// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js


module.exports = (sequelize, Sequelize) => {
    const Purchase_advert = sequelize.define("purchase_advert", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        purchase_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },

        clientID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "client",
                key: "ID",
            },
        },

        advertID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "advert",
                key: "ID",
            },
        },

    })
    Purchase_advert.associate = function(models) {
        Purchase_advert.belongsTo(models.Client, { foreignKey: 'ClientID' })
        Purchase_advert.belongsTo(models.Advert, { foreignKey: 'advertID' })
        Purchase_advert.hasMany(models.Invoice, {
            as: 'invoiceID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Purchase_advert;
}