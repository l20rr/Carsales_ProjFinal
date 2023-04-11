const express = require("express");
const cors = require("cors");
const { and } = require("sequelize");

const db = require("./models/index")
const Client = db.client;
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

var corsOptions = {
  origin:"http://localhost:3001"
};


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true }));

// this for the cookies
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true }));
app.use(session({
    key: "userId",
    // this for development
    secret: "tempsecret",
    resave: false,
    saveUninitialized:false,
    cookie: {
        // cookie expires in 8 hours
        expires: 60 * 60 * 8,
    },
}));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




//connect without erasing data
/*
/*db.sequelize.sync()
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
     // create the admin, if they do not already exist
     const password="1234";
     bcrypt.hash(password, 10).then((hash)=>{
      Client.create({
             username: "admin",
             email:"email@mail.com",
             password: hash,
             name: "admin",
             locality:"locality",
	           tel:1254569,
	           birthdate:"1905-05-05",
             admin: true,
             approved: true,
         }).catch(err => {
             console.log("Already exists");
             console.log(err)
         });
     });
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
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});