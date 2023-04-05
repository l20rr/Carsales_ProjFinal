const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const PublishAD = sequelize.define("publishAD", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        advertID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "advert",
                key: "ID",
            },
            validate: {
                notEmpty: true
            }
        },
        clientID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "client",
                key: "ID",
            },
            validate: {
                notEmpty: true
            }
        },
    }, {
        freezeTableName: true
    });
    PublishAD.associate = function(models) {
        PublishAD.belongsTo(models.Client)
        PublishAD.belongsTo(models.Advert)
        PublishAD.hasMany(models.Favorites, {
            foreignKey: 'publishadID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        PublishAD.hasMany(models.Purchase_advert, {
            foreignKey: 'publishadID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };

    return PublishAD;
};