// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js

module.exports = (sequelize, Sequelize) => {
    const Paypalpayment = sequelize.define("paypalpayment", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        paymentID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "payment",
                key: "ID",
            },
        },

        external_txn_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        client_email_addr: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    Paypalpayment.associate = function(models) {
        Paypalpayment.belongsTo(models.Payment)

    };
    return Paypalpayment
}