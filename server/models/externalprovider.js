// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js

module.exports = (sequelize, Sequelize) => {
    const Externalprovider = sequelize.define("externalprovider", {

        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        provider_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        end_point_url: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Externalprovider.associate = function(models) {
        Externalprovider.hasMany(models.Logindataexternal, {
            foreignKey: 'externalproviderID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Externalprovider
}