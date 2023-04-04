// import important parts of sequelize library
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
            references: {
                model: "category",
                key: "ID",
            },
        },

    })
    Subcategory.associate = function(models) {
        Subcategory.belongsTo(models.Category, { foreignKey: 'categoryID' })
        Subcategory.hasMany(models.Vehicle, {
            as: 'subcategoryID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Subcategory
}