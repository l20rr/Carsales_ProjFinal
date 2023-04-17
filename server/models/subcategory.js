// import important parts of sequelize library
const { Timestamp } = require("mongodb");
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js
module.exports = (sequelize, Sequelize) => {
    const Subcategory = sequelize.define("subcategory", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        categoryID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "category",
                key: "ID",
            },
        },
        SubcategoryName: {
            type: Sequelize.STRING,
            allowNull: false,
        },

    }, {
        freezeTableName: true,
        timestamp:false
    });
    Subcategory.associate = function(models) {
        Subcategory.belongsTo(models.category)
        Subcategory.hasMany(models.vehicle, {
            foreignKey: 'subcategoryID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Subcategory
}