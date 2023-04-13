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
        publishadID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "PublishAD",
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
        Favorites.belongsTo(models.Client)
        Favorites.belongsTo(models.PublishAD)
    };

    return Favorites;
};