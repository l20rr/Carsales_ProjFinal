const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const anuncioRouter = require('./router');

app.use(bodyParser.json());

app.use('/uploads', express.static('./uploads'));

var corsOptions = {
    origin: "http://localhost:3001",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

// Conectando ao MongoDB
mongoose.connect('mongodb://127.0.0.1/anunciosEx', { useNewUrlParser: true, useUnifiedTopology:true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Iniciando o servidor
app.listen(3002, () => console.log('Servidor iniciado na porta 3002!'));

// Rota para o anúncio
app.use('/anuncios', anuncioRouter);