// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class creditcardpayment extends Model {}

creditcardpayment.init(
  {
    
    paymentID: {
      type: DataTypes.INTEGER,
      references: {
        model: "payment",
        key: "ID",
      },
    },

    creditcard_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    creditcard_security_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    creditcard_expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

})

module.exports = creditcardpayment;