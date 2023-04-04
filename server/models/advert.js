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
            validate: {
                notEmpty: true
            },
        },
        vehicleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        Advert.belongsTo(models.Vehicle, { foreignKey: 'vehicleID' })
        Advert.belongsTo(models.Client, { foreignKey: 'clientID' })
        Advert.belongsToMany(models.Client, { through: 'favorites', foreignKey: 'advertID' })
        Advert.belongsToMany(models.Client, { through: 'purchase_advert', foreignKey: 'advertID' })
    };

    return Advert;
};