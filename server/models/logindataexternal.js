const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Logindataexternal = sequelize.define("logindataexternal", {
      id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      accountID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
      },
      externalproviderID:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
   external_provider_token:{
    type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
   },
},{
    freezeTableName: true
});
  
      return Logindataexternal;
  };
