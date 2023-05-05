const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.user;
const Client = db.client
const googleAuth = db.googleAuth


const bcrypt = require('bcrypt');
const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');


require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

router.post('/signup', async(req, res) => {

    try {

        const { fullname, email, password } = req.body;
        const userExists = await Users.findOne({ where: { email } });
        if (userExists) {

            return res.status(400).json({ message: 'User already exists' });

            }

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = crypto.randomBytes(16).toString('hex');

        const token = serverClient.createUserToken(userId);

        // criando o usuário

        const user = await Users.create({

            fullname: fullname,
            email: email,
            password: hashedPassword,
            streamChatUserId: userId

            });

        const userID = parseInt(user.id);

        res.status(200).json({ token, userId, userID, fullname, email, hashedPassword });

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: error });

    }

});
const jwt = require('jsonwebtoken');


router.post('/login', async(req, res) => {

    try {

        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email }, attributes: ['id', 'email', 'fullname', 'password', 'streamChatUserId'] });

        console.log(user);

        if (!user) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, user.password);

        if (success) {
            
            const serverClient = connect(api_key, api_secret, app_id);

            const client = StreamChat.getInstance(api_key, api_secret);

            let userId = user.streamChatUserId;

            const newToken = serverClient.createUserToken(userId);

            const userID = parseInt(user.id);

            res.status(200).json({ token: newToken, fullname: user.fullname, email, userID, userId });

        } else {

            res.status(500).json({ message: 'Incorrect password' });

            }

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: error });

    }

});

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '574474093326-klu8iamgt3rupvjhnstb3o5jcju58h9l.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const client2 = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);

const secret = 'vxwzb46w7drg';

router.post('/google', async (req, res) => {

    const { tokenId } = req.body;

    try {
        const ticket = await client2.verifyIdToken({
            idToken: tokenId,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name } = payload;
        const userId = crypto.randomBytes(16).toString('hex');
        const user = await Users.findOne({ where: { email }});
        

        if (!user) {
            
            const newUser = new Users({
                email: email,
                fullname: name,
                is_google_user: true, 
                googleID: payload.sub,
                streamChatUserId: userId

            });
            await newUser.save();

            const userID = newUser.id;

            const serverClient = connect(api_key, api_secret, app_id);
            
            const token = serverClient.createUserToken(userId);

            

            const jwtToken = jwt.sign({ name, email }, secret); 

            res.status(200).json({ token, userID, userId, name, email, jwtToken });
        }else {
            // User already exists, return token
            const serverClient = connect(api_key, api_secret, app_id);
            const userId = crypto.randomBytes(16).toString('hex');
            const token = serverClient.createUserToken(userId);

            const userID = user.id;
          
            res.status(200).json({ token, userID, name, email });
          }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Authentication failed' });
    }
});




router.put('/users/:id', async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const id = req.params.id;
        const user = await Users.findOne({ where: { id } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (email && user.email !== email) {
            const userExists = await Users.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }
        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
        // atualizando o usuário
        await user.update({
            fullname: fullname || user.fullname,
            email: email || user.email,
            password: hashedPassword
        });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});


router.get("/AllUsers", async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['id', 'fullname', 'email', 'admin', 'createdAt']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
router.get("/users/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const user = await Users.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: `Cannot find User with id=${id}.` });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving User with id=" + id });
    }
});
const client = StreamChat.getInstance(api_key, api_secret);

router.delete("/Users/:id/:streamChatUserId", async(req, res) => {
      const id = req.params.id;
     const streamChatUserId = req.params.streamChatUserId;

    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).send({
                message: `Cannot find User with id=${id}.`
            });
        }

        const { streamChatUserId } = user;

        let destroyOptions = {
            delete_conversation_channels: true,
            mark_messages_deleted: true,
            hard_delete: true,
        };

        await client.deleteUser(streamChatUserId, destroyOptions);
        await Users.destroy({ where: { id: id } });

        return res.send({
            message: "User was deleted successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/streamChatUserId/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const user = await Users.findOne({ attributes: ['streamChatUserId'], where: { streamChatUserId: id } });
        if (!user) {
            return res.status(404).json({ message: `Cannot find streamChatUserId with id=${id}.` });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving streamChatUserId with id=" + id });
    }
});


module.exports = router;