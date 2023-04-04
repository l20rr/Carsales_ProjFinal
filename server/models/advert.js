const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Advert = sequelize.define("advert ", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        clientID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "client",
                key: "ID",
            },
            validate: {
                notEmpty: true
            },
        },
        vehicleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "vehicle",
                key: "ID",
            },
            validate: {
                notEmpty: true
            },
        },
        creation_date: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });
    Advert.associate = function(models) {
        Advert.belongsTo(models.Vehicle)
        Advert.belongsTo(models.Client)
        Advert.belongsToMany(models.Client, {
            through: 'favorites',
            foreignKey: 'advertID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Advert.belongsToMany(models.Client, {
            through: 'purchase_advert',
            foreignKey: 'advertID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };

    return Advert;
};