const router = require("express").Router();
const { User } = require("../../models");

// CREATE a new user
router.post("/register", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
        .then((dbUserData) => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// user login, /api/user/login
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({
                message: "No user with that email address!",
            });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You are now logged in." });
        });
    });
});