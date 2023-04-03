const express = require("express");
const router = express.Router();
const db = require("../models");
const Users = db.user;
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const {name, email, password, confPassword} = req.body;
  if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      name: name,
      email: email,
      password: hash,
     
  });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { email: user.email, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, email: email, password:password ,id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
