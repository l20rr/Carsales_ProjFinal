/*const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Logindataexternal = sequelize.define("logindataexternal", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accountID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "account",
                key: "ID",
            },
            validate: {
                notEmpty: true
            }
        },
        externalproviderID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "externalprovider",
                key: "ID",
            },
        },
        external_provider_token: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    }, {
        freezeTableName: true
    });
    Logindataexternal.associate = function(models) {
        Logindataexternal.belongsTo(models.Externalprovider)
        Logindataexternal.belongsTo(models.Account)
    };
    return Logindataexternal;
};*/