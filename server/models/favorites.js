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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            validate: {
                notEmpty: true
            },
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Favorites.associate = function(models) {
        Favorites.belongsTo(models.client, {
            foreignKey: 'clientID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        Favorites.belongsTo(models.publishAD, {
            foreignKey: 'publishadID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
    };

    return Favorites;
};