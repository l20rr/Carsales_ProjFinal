const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const PublishAD = sequelize.define("publishAD", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Advert_vehicleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "Advert_vehicle",
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
        freezeTableName: true,
        timestamps: false
    });
    PublishAD.associate = function(models) {
        PublishAD.belongsTo(models.Client)
        PublishAD.belongsTo(models.Advert_vehicle)
        PublishAD.hasMany(models.Favorites, {
            foreignKey: 'publishadID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        PublishAD.hasMany(models.purchase_Advert_vehicle, {
            foreignKey: 'publishadID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };

    return PublishAD;
};