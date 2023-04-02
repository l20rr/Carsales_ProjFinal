const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Favorites = sequelize.define("favorites", {
      ID : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      clientID:{
      type: Sequelize.INTEGER,
      allowNull: false,
      validate:{
          notEmpty: true
      },
      },
      advertID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        },
      }
},{
    freezeTableName: true
});
  
      return Favorites;
  };