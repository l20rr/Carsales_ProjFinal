// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js

module.exports = (sequelize, Sequelize) => {
    const Hashalgo = sequelize.define("hashalgo", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        hash_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        creation_date: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });
    Hashalgo.associate = function(models) {
        Hashalgo.hasMany(models.Logindata, {
            foreignKey: 'hash_algoID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Hashalgo
}