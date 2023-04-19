// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
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
            references: {
                model: "subcategory",
                key: "ID",
            },
        },

        license: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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
            defaultValue: "id",
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
        indexes: [{ fields: ['ID', 'license'], unique: true }],
        freezeTableName: true

    });
    Vehicle.associate = function(models) {
        Vehicle.belongsTo(models.Subcategory)
        Vehicle.hasMany(models.Advert_vehicle, {
            foreignKey: 'vehicleID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Vehicle;
}