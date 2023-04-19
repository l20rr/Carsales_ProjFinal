const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const PublishAD = sequelize.define("publishAD", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Advert_vehicleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "Advert_vehicle",
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
        PublishAD.belongsTo(models.Advert_vehicle, {
            foreignKey: 'Advert_vehicleID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        PublishAD.hasMany(models.Favorites, {
            foreignKey: 'publishadID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
        PublishAD.hasMany(models.purchase_Advert_vehicle, {
            foreignKey: 'publishadID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
    };

    return PublishAD;
};