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


//db.hashalgo = require("./hashalgo")(sequelize, Sequelize);
db.externalprovider = require("./externalprovider")(sequelize, Sequelize);
//db.emailvalidationstatus = require("./emailvalidationstatus")(sequelize, Sequelize);
db.chatroom = require("./chatroom")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);

//db.logindata = require('./logindata')(sequelize, Sequelize)
//db.account = require("./account")(sequelize, Sequelize);
//db.logindataexternal = require("./logindataexternal")(sequelize, Sequelize);
db.subcategory = require("./subcategory")(sequelize, Sequelize);
db.vehicle = require("./vehicle")(sequelize, Sequelize);
db.client = require("./client")(sequelize, Sequelize);
db.message = require("./message")(sequelize, Sequelize);
db.Advert_vehicle = require("./Advert_vehicle")(sequelize, Sequelize);
db.publishAD = require("./publishAD")(sequelize, Sequelize);
db.favorites = require("./favorites")(sequelize, Sequelize);
db.purchase_Advert_vehicle = require("./purchase_Advert_vehicle")(sequelize, Sequelize);
db.invoice = require("./invoice")(sequelize, Sequelize);
db.payment = require("./payment")(sequelize, Sequelize);
db.paypalpayment = require("./paypalpayment")(sequelize, Sequelize);
//db.user = require("./Client.model")(sequelize,Sequelize);


module.exports = db;