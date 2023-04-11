// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js


module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {

        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        categoryName: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });


    Category.associate = function(models) {
        Category.hasMany(models.subcategory, {
            foreignKey: 'categoryID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Category;
}