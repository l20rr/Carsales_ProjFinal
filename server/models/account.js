const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            references: {
                model: "logindata",
                key: "ID",
            },
        },
        logName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        register_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Account.associate = function(models) {
        Account.belongsTo(models.logindata)
        Account.hasMany(models.Client, {
            foreignKey: 'accountID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        Account.hasMany(models.logindataexternal, {
            foreignKey: 'accountID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Account;
};