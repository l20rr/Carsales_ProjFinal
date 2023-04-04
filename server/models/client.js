const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accountID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        locality: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        tel: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        birthdate: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });
    Client.associate = function(models) {
        Client.belongsTo(models.Account, { foreignKey: 'accountID' })
        Client.hasMany(models.Message, { as: 'clientID' })
        Client.belongsToMany(models.vehicle, { through: 'advert', foreignKey: 'clientID' })
        Client.belongsToMany(models.advert, { through: 'favorites', foreignKey: 'clientID' })
        Client.belongsToMany(models.advert, { through: 'purchase_advert', foreignKey: 'clientID' })
    };

    return Client;
};