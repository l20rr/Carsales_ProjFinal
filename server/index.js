const express = require("express");
const cors = require("cors");
const { and } = require("sequelize");

const app = express();

var corsOptions = {
    origin: "http://localhost:3001",
    methods: ["POST, GET"],
    credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const db = require("./models/index")

//connect without erasing data
/*
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

*/
//connect by erasing data

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);


const vehicleRouter = require("./routes/Vehicle");
app.use("/vehicle", vehicleRouter);


const cat = require("./routes/Category");
app.use("/cat", cat);


const subcat = require("./routes/subcategory");
app.use("/subcat", subcat);



// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

require('dotenv').config();