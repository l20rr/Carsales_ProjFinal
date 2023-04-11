// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js
module.exports = (sequelize, Sequelize) => {
    const Creditcardpayment = sequelize.define("creditcardpayment", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        paymentID: {
            type: Sequelize.INTEGER,
            references: {
                model: "payment",
                key: "ID",
            },
        },

        creditcard_num: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        creditcard_security_code: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        creditcard_expiration_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    Creditcardpayment.associate = function(models) {
        Creditcardpayment.belongsTo(models.Payment)
    };
    return Creditcardpayment;
}