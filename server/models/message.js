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
        clientIDRecepition: {
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
        Message.belongsTo(models.Client, { foreignKey: 'clientIDRecepition' })
        Message.belongsTo(models.Client, { foreignKey: 'clientIDEmission' })
        Message.belongsTo(models.Chatroom, { foreignKey: 'chatroomID' })
    };

    return Message;
};