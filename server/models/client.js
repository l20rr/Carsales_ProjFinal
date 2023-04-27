const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "User",
                key: "id",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        Client.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        Client.hasMany(models.favorites, {
            foreignKey: 'clientID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })

        Client.belongsToMany(models.vehicle, {
            through: 'publishAD',
            foreignKey: 'clientID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })

        Client.hasMany(models.publishAD, {
            foreignKey: 'clientID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
    };
    return Client;
};