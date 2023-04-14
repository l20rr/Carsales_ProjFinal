const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const priorityAdvert = sequelize.define("priorityAdvert", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        advertID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "Advert_vehicle",
                key: "ID",
            },
            validate: {
                notEmpty: true
            },
        },
        invoiceID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "invoice",
                key: "ID",
            },
            validate: {
                notEmpty: true
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });
    priorityAdvert.associate = function(models) {
        priorityAdvert.belongsTo(models.Advert_vehicle)
        priorityAdvert.belongsTo(models.invoice)
    };

    return priorityAdvert;
};