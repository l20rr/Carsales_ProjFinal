const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("../controllers");
const sequelize = require("../config/connection");

const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Sets up the Express App
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Start the server to begin listening

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`);
    });
});