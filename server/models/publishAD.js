const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const PublishAD = sequelize.define("publishAD", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vehicleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "vehicle",
                key: "ID",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            validate: {
                notEmpty: true
            }
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });
    PublishAD.associate = function(models) {
        PublishAD.belongsTo(models.Client, {
            foreignKey: 'clientID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        PublishAD.belongsTo(models.vehicle, {
            foreignKey: 'vehicleID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        PublishAD.hasMany(models.Favorites, {
            foreignKey: 'publishadID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
        PublishAD.hasMany(models.purchase_Advert, {
            foreignKey: 'publishadID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
        PublishAD.hasMany(models.priorityAdvert, {
            foreignKey: 'publishadID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
    };

    return PublishAD;
};