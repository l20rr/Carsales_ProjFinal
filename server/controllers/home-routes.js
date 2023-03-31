const router = require("express").Router();

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        req.redirect("/"); //think this needs to be res
        return;
    }

    res.render("signup");
});

module.exports = router;