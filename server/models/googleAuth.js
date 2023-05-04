//const router = require("express").Router();
//const { User } = require("../../models");
const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const GoogleAuth = sequelize.define("googleAuth", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    clientID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: {
            model: "client",
            key: "ID",
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
            notEmpty: true
        }
    },

    googleID: {
        type: Sequelize.STRING,
        
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        
        
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    

    }, {
        freezeTableName: true
    });

    GoogleAuth.associate = function(models) {
        GoogleAuth.belongsTo(models.client, {
            foreignKey: 'clientID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
    };
      return GoogleAuth;

};


