// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class vehicle extends Model {}

vehicle.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    subcategoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: "subcategory",
        key: "ID",
      },
    },

    license: {
      type: DataTypes.VARCHAR,
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    kms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    brand: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    model: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    fuel: {
        type: DataTypes.VARCHAR,
        allowNull: false,
    },

    power: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    num_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    image: {
      type: DataTypes.VARCHAR,
      allowNull: false,
      defaultValue: "id",
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "vehicle",
  }
);

module.exports = vehicle;