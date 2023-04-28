// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js


module.exports = (sequelize, Sequelize) => {
    const purchase_Advert = sequelize.define("purchase_Advert", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        publishadID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "PublishAD",
                key: "id",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    purchase_Advert.associate = function(models) {
        purchase_Advert.belongsTo(models.publishAD, {
            foreignKey: 'publishadID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
        purchase_Advert.hasMany(models.invoice, {
            foreignKey: 'invoiceID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
    };
    return purchase_Advert;
}