const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Advert_vehicle = sequelize.define("Advert_vehicle", {
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
    }, {
        freezeTableName: true,

    });
    Advert_vehicle.associate = function(models) {
        Advert_vehicle.belongsTo(models.Vehicle)
        Advert_vehicle.hasMany(models.priorityAdvert, {
            foreignKey: 'advertID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Advert_vehicle.belongsToMany(models.Client, {
            through: 'PublishAD',
            foreignKey: 'Advert_vehicleID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };

    return Advert_vehicle;
};