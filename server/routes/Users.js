const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.user;


const bcrypt = require('bcrypt');
const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');


require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

router.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
    
        

        const userId = crypto.randomBytes(16).toString('hex');
    
        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);
    
        // criando o usuário
        Users.create({
          fullname: fullname,
          email: email,
          password: hashedPassword
        });

     
    
        res.status(200).json({ token, userId, fullname, email, hashedPassword });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
    });

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: email });

        if(!users.length) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            res.status(200).json({ token, fullname: users[0].fullname, email, userId: users[0].id});
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {ads
        console.log(error);

        res.status(500).json({ message: error });
    }
});

module.exports = router;
