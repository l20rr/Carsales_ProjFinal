const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const priorityAdvert = sequelize.define("priorityAdvert", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        publishadID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "publishAD",
                key: "ID",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            validate: {
                notEmpty: true
            },
        },
        invoiceID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "invoice",
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
        timestamps: false
    });
    priorityAdvert.associate = function(models) {
        priorityAdvert.belongsTo(models.invoice, {
            foreignKey: 'invoiceID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        priorityAdvert.belongsTo(models.PublishAD, {
            foreignKey: 'publishadID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
    };

    return priorityAdvert;
};