// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class externalprovider extends Model {}

externalprovider.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    provider_name: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    end_point_url: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },
})

module.exports = externalprovider;