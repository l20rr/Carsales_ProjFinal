const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        chatroomID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "chatroom",
                key: "ID",
            },
            validate: {
                notEmpty: true
            }
        },
        clientIDEmission: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        body: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        clientIDReception: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        message_date: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });
    Message.associate = function(models) {
        Message.belongsTo(models.Client)
        Message.belongsTo(models.Client)
        Message.belongsTo(models.Chatroom)
    };

    return Message;
};