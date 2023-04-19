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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            validate: {
                notEmpty: true
            },
        },
    }, {
        freezeTableName: true,

    });
    Advert_vehicle.associate = function(models) {
        Advert_vehicle.belongsTo(models.Vehicle, {
            foreignKey: 'vehicleID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        Advert_vehicle.hasMany(models.priorityAdvert, {
            foreignKey: 'advertID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
        Advert_vehicle.belongsToMany(models.Client, {
            through: 'PublishAD',
            foreignKey: 'Advert_vehicleID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
    };

    return Advert_vehicle;
};