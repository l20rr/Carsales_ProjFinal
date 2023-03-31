module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "crud",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  /*
  // import Sequelize constructor from library
  const Sequelize = require("sequelize");
  require("dotenv").config();

  // create connection to db
  let sequelize;

  if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_UID,
      process.env.DB_PW,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
      }
    );
  }

  module.exports = sequelize;
  */