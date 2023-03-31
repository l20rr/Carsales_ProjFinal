const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

   
const argon2 = require('argon2')

exports.getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['id','uuid','name','password','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


exports.createUser = async(req, res) =>{
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
           
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
      exports.findOne = (req, res) => {
        const id = req.params.id;
      
        User.findByPk(id)
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Tutorial with id=${id}.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Tutorial with id=" + id
            });
          });
      };

      exports.delete = (req, res) => {
        const id = req.params.id;
      
        User.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Tutorial was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Tutorial with id=" + id
            });
          });
      };

      /*
        const router = require("express").Router();

        const apiRoutes = require("./api");
        const homeRoutes = require("./home-routes");

        router.use("/", homeRoutes);
        router.use("/api", apiRoutes);

        module.exports = router;
      */
