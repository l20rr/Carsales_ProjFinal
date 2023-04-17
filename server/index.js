const express = require("express");
const cors = require("cors");
const { and } = require("sequelize");
const db = require("./models");
const subcategory = db.subcategory;
const Category = db.category;


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
     // create the admin, if they do not already exist
     Category.create({
      categoryName:"Carro"
         }).catch(err => {
             console.log("Already exists");
             console.log(err)
         }); Category.create({
          categoryName:"Autocaravana"
             }).catch(err => {
                 console.log("Already exists");
                 console.log(err)
             });
             Category.create({
              categoryName:"Moto"
                 }).catch(err => {
                     console.log("Already exists");
                     console.log(err)
                 });
         subcategory.create({
          categoryID:1,
          SubcategoryName:"SUV"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:1,
          SubcategoryName:"City"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:1,
          SubcategoryName:"Sedan"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:1,
          SubcategoryName:"Desportivo"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:1,
          SubcategoryName:"4x4"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:2,
          SubcategoryName:"campervan"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:2,
          SubcategoryName:"capucino"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:2,
          SubcategoryName:"perfilada"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:2,
          SubcategoryName:"integral"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });   
        subcategory.create({
          categoryID:3,
          SubcategoryName:"Street"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:3,
          SubcategoryName:"Custom"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:3,
          SubcategoryName:"Naked"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:3,
          SubcategoryName:"Scooter"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
        });
        subcategory.create({
          categoryID:3,
          SubcategoryName:"Sport"
      }).catch(err => {
          console.log("Already exists");
          console.log(err)
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

require('dotenv').config();