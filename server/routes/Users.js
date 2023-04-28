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

router.post('/signup', async(req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const userExists = await Users.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const serverClient = connect(api_key, api_secret, app_id);
        
        
        

        const hashedPassword = await bcrypt.hash(password, 10);

        // criando o usuário
        const user = await Users.create({
            fullname: fullname,
            email: email,
            password: hashedPassword
        });

        const userId = crypto.randomBytes(16).toString('hex');
        const token = serverClient.createUserToken(userId);
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
        const { email, password, token } = req.body;

        const user = await Users.findOne({ where: { email }, attributes: ['id', 'email', 'fullname', 'password'] });

        console.log(user);

        if (!user) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, user.password);

        if (success) {
            const serverClient = connect(api_key, api_secret, app_id);
            const client = StreamChat.getInstance(api_key, api_secret);

            
            let userId;
            if (token) {
                try {
                    const decodedToken = jwt.verify(token, api_secret);
                    userId = decodedToken.user.id;
                } catch (err) {
                    console.error(err);
                    return res.status(401).json({ message: 'Invalid token' });
                }
            } else {
                userId = crypto.randomBytes(16).toString('hex');
            }

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


router.get("/AllUsers", async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['id', 'fullname', 'email']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.get("/Users/:id", async(req, res) => {
    const id = req.params.id;
    Users.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                console.log("error")
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
});



const client = StreamChat.getInstance(api_key, api_secret);

router.delete("/Users/:id", async(req, res) => {

    const id = req.params.id;

    const user = await Users.findByPk(id);
    if (!user) {
        return res.status(404).send({
            message: `Cannot find User with id=${id}.`
        });
    }

    try {
        const destroy = await client.deleteUser(id, {
            delete_conversation_channels: true,
            mark_messages_deleted: true,
            hard_delete: true,
        });
        await Users.destroy({ where: { id: id } });
        res.send({
            message: "User was deleted successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    }
});


module.exports = router;