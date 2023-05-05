const express = require("express");
const cors = require("cors");
const { and } = require("sequelize");
const db = require("./models");
const subcategory = db.subcategory;
const Category = db.category;
const bcrypt = require('bcrypt');
const User = db.user;
const crypto = require('crypto');
const Client = db.client;




const app = express();

var corsOptions = {
    origin: "http://localhost:3001",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//connect without erasing data!!!!!!!!!!

db.sequelize.sync().then(() => {

    /*  async function createUserAndClient() {

          try {
            // Cria o usuário
            const password = "1234";
            const hash = await bcrypt.hash(password, 10);
            const userId = crypto.randomBytes(16).toString('hex');
            const user = await User.create({
              fullname: "admin",
              email: "admin@gmail.com",
              password: hash,
              name: "admin",
              admin: true,
              streamChatUserId: userId
            }).catch(err =>{
              console.log("Erro:", err.message);
            })
        
            // Cria o cliente com o ID do usuário recém-criado
            const client = await Client.create({
              userID: user.id, // Chave estrangeira referenciando o ID do usuário
              locality: "admin",
              telem: 98798798,
              birthdate: "2003-02-02",
            }).catch(err =>{
              console.log("Erro:", err.message);
            })
        
            console.log("Cliente criado com sucesso!");
          } catch (err) {
            console.log("Erro ao criar cliente:", err.message);
          }
        }
        
        createUserAndClient();

        Category.create({
            categoryName: "Carro"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        Category.create({
            categoryName: "Autocaravana"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        Category.create({
            categoryName: "Moto"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 1,
            SubcategoryName: "SUV"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 1,
            SubcategoryName: "City"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 1,
            SubcategoryName: "Sedan"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 1,
            SubcategoryName: "Desportivo"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 1,
            SubcategoryName: "4x4"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 2,
            SubcategoryName: "Campervan"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 2,
            SubcategoryName: "Capucino"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 2,
            SubcategoryName: "Perfilada"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 2,
            SubcategoryName: "Integral"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 3,
            SubcategoryName: "Street"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 3,
            SubcategoryName: "Custom"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 3,
            SubcategoryName: "Naked"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 3,
            SubcategoryName: "Scooter"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });
        subcategory.create({
            categoryID: 3,
            SubcategoryName: "Sport"
        }).catch(err => {
            console.log("Already exists");
            console.log(err)
        });*/


})



app.use('/uploads', express.static('./uploads'));

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);


const vehicleRouter = require("./routes/Vehicle");
app.use("/vehicle", vehicleRouter);


const cat = require("./routes/Category");
app.use("/cat", cat);

const fav = require("./routes/Favorites");
app.use("/fav", fav);

const subcat = require("./routes/subcategory");
app.use("/subcat", subcat);

const client_user = require("./routes/Client");
app.use("/cl", client_user);

const publi = require("./routes/PublishAD");
app.use("/publi", publi);

const invoice = require('./routes/Invoice')
app.use("/in", invoice)

const payment = require('./routes/Payment')
app.use("/pay", payment)

const priority = require('./routes/PriorityAdvert')
app.use("/pri", priority)

const PurchaseAdvert = require('./routes/PurchaseAdvert')
app.use("/padvert", PurchaseAdvert)
    // set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

require('dotenv').config();