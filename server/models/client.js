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
            references: {
                model: "account",
                key: "ID",
            },
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
        Client.belongsTo(models.Account)
        Client.hasMany(models.Message, {
            foreignKey: 'clientIDEmission',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Client.hasMany(models.Message, {
            foreignKey: 'clientIDReception',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Client.hasMany(models.Favorites, {
            foreignKey: 'clientID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Client.hasMany(models.purchase_Advert_vehicle, {
            foreignKey: 'clientID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Client.belongsToMany(models.Advert_vehicle, {
            through: 'PublishAD',
            foreignKey: 'clientID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Client;
};