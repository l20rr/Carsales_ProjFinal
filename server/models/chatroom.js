// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js
module.exports = (sequelize, Sequelize) => {
    const Chatroom = sequelize.define("chatroom", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        creation_date: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    });
    Chatroom.associate = function(models) {
        Chatroom.hasMany(models.message, {
            foreignKey: 'chatroomID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Chatroom;
}