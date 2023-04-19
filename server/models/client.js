const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "User",
                key: "id",
            },
            validate: {
                notEmpty: true
            }
        },
        
        locality: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        telem: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        birthdate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Client.associate = function(models) {
        Client.belongsTo(models.User)
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