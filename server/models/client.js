const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
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
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
   locality:{
    type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
   },
   tel:{
    type: Sequelize.INTEGER,
    allowNull: false,
    validate:{
        notEmpty: true
    }
  },
  birthdate:{
    type: Sequelize.DATE,
    allowNull: false,
  }
},{
    freezeTableName: true
});
  
      return Client;
  };
