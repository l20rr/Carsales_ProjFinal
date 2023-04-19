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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },

        creditcard_num: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        creditcard_security_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        creditcard_expiration_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Creditcardpayment.associate = function(models) {
        Creditcardpayment.belongsTo(models.Payment, {
            foreignKey: 'paymentID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
    };
    return Creditcardpayment;
}