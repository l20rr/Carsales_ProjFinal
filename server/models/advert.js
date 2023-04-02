const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Advert = sequelize.define("advert ", {
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
      vehicleID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        },
      },
      creation_date:{
        type: Sequelize.DATE,
        allowNull: false,
      }
},{
    freezeTableName: true
});
  
      return Favorites;
  };