// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js


module.exports = (sequelize, Sequelize) => {
    const purchase_Advert_vehicle = sequelize.define("purchase_Advert_vehicle", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        clientID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "client",
                key: "ID",
            },
        },

        publishadID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "PublishAD",
                key: "ID",
            },
        }
    }, {
        freezeTableName: true,
    });
    purchase_Advert_vehicle.associate = function(models) {
        purchase_Advert_vehicle.belongsTo(models.Client)
        purchase_Advert_vehicle.belongsTo(models.PublishAD)
        purchase_Advert_vehicle.hasMany(models.Invoice, {
            foreignKey: 'invoiceID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return purchase_Advert_vehicle;
}