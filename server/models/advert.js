const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Advert = sequelize.define("advert ", {
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
    Advert.associate = function(models) {
        Advert.belongsTo(models.Vehicle)
        Advert.belongsToMany(models.Client, {
            through: 'PublishAD',
            foreignKey: 'advertID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };

    return Advert;
};