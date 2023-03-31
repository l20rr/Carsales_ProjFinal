// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class logindata extends Model {}

logindata.init({
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    password_hash: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    password_salt: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    email_addr: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    last_login: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    confirmation_token: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    confirmation_token_time: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    recovery_token: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    hash_algoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    email_validation_statusID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

})

module.exports = logindata;