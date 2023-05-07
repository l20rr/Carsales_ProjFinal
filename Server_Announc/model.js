const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
  anuncianteId: { type: Number, required: true },
  descricao: { type: String, required: true },
  imagem: { type: String, required: true },
  link: { type: String, required: true },
  nivelServico: { type: Number, required: true },
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;