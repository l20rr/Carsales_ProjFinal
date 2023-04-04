// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js
module.exports = (sequelize, Sequelize) => {
    const Emailvalidationstatus = sequelize.define("emailvalidationstatus", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        status_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        status_description: {
            type: Sequelize.STRING,
            allowNull: false,
        },

    })
    Emailvalidationstatus.associate = function(models) {
        Emailvalidationstatus.hasMany(models.Logindata, { as: 'email_validation_statusID' })
    };
    return Emailvalidationstatus
}