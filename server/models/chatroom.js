// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class chatroom extends Model {}

chatroom.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.VARCHAR,
      allowNull: false,
    },

    creation_date: {
      type: DataTypes.DATE,
      allowNull: false, 
    }
})

module.exports = chatroom;