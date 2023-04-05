const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Advert_vehicle = sequelize.define("Advert_vehicle ", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
    Advert_vehicle.associate = function(models) {
        Advert_vehicle.belongsTo(models.Vehicle)
        Advert_vehicle.belongsToMany(models.Client, {
            through: 'PublishAD',
            foreignKey: 'Advert_vehicleID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };

    return Advert_vehicle;
};