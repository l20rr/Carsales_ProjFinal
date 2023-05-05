const dbConfig = require("../config/database");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;




db.user = require("./User.model")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.subcategory = require("./subcategory")(sequelize, Sequelize);
db.vehicle = require("./vehicle")(sequelize, Sequelize);
db.client = require("./client")(sequelize, Sequelize);
db.publishAD = require("./publishAD")(sequelize, Sequelize);
db.favorites = require("./favorites")(sequelize, Sequelize);
db.purchase_Advert = require("./purchase_Advert")(sequelize, Sequelize);
db.invoice = require("./invoice")(sequelize, Sequelize);
db.payment = require("./payment")(sequelize, Sequelize);
db.priorityAdvert = require("./priorityAdvert")(sequelize, Sequelize);



module.exports = db;