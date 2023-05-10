// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
const { vehicle } = require(".");
// import our database connection from config.js


module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define("vehicle", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },

        subcategoryID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "subcategory",
                key: "id",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },

        license: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        year: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },

        kms: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        brand: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        negotiable: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        fuel: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        power: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        num_seats: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        image: {
            type: Sequelize.STRING,
            allowNull: false,
         
        },

        image2: {
            type: Sequelize.STRING,
            allowNull: false,
      
        },

        image3: {
            type: Sequelize.STRING,
            allowNull: false,
        
        },

        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

    }, {
        freezeTableName: true,
        timestamps: false

    });
    Vehicle.associate = function(models) {
        Vehicle.belongsTo(models.subcategory, {
            foreignKey: 'subcategoryID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })

        Vehicle.belongsToMany(models.client, {
            through: 'publishAD',
            foreignKey: 'vehicleID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })

        Vehicle.hasMany(models.publishAD, {
            foreignKey: 'vehicleID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
        })
    };
    return Vehicle;
}