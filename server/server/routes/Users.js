const express = require("express");
const router = express.Router();
const db = require("../models");
const Client = db.client;
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const secret = "mysecret";
const { sign } = require("jsonwebtoken");


router.post("/", async (req, res) => {
    const {username,name,email, password, confPassword, locality,tel,birthdate} = req.body; 
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    bcrypt.hash(password, 10).then((hash) => {
      Client.create({
        username: username,
        name: name,
        email: email,
        password: hash,
        locality:locality,
        tel:tel,
        birthdate:birthdate,
       /* admin: false,
        approved: false*/
  
    });
    
      res.json("SUCCESS");
    });
  });

  router.post('/login', async (req, res) => {
      
    const { email , password } = req.body;
  
    const user = await Client.findOne({ where: {email: email}});
  
    // if the user is not in the table
    if (!user){
        res.json({error: "User doesn't exist!"});
    }
    else{
  
        if (user.approved===false){
            res.json({error: "approval"});
        }
        else{
  
            bcrypt.compare(password, user.password).then((matched)=>{
                if(!matched){
                    res.json({error: "Wrong User Credentials!"});
                }
                else{
                     const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h'
                    })
                    res.cookie('token', token, {httpOnly: true});
                    res.status(200).json({status:1, auth:true, token:token});
                }
            });
  
        }
  
        
    }
  
  });


  
  router.get('/checkToken', async function checkToken(req, res){
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if(!token){
            res.json({status:401,msg:'Não autorizado: Token inexistente!'});
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({status:401,msg:'Não autorizado: Token inválido!'});
                }else{
                    res.json({status:200})
                }
            })
        }
  });



module.exports = router;
