const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
      id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    logName:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
   register_date:{
    type: Sequelize.DATE,
    allowNull: false,
   }
},{
    freezeTableName: true
});
  
      return Account;
  };