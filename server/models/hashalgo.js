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
    },

})
return Hashalgo
}
