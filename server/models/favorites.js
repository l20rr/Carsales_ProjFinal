const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Favorites = sequelize.define("favorites", {
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
        advertID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "advert",
                key: "ID",
            },
            validate: {
                notEmpty: true
            },
        }
    }, {
        freezeTableName: true
    });
    Favorites.associate = function(models) {
        Favorites.hasMany(models.Client, {
            as: 'clientID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Favorites.hasMany(models.Advert, {
            as: 'advertID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };

    return Favorites;
};