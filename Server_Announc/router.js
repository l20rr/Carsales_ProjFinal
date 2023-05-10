const express = require('express');
const multer = require('multer');
const Anuncio = require('./model');

const router = express.Router();
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Rota de POST para criar um novo anúncio
router.post('/post', upload.single('imagem'), async (req, res) => {
  const { anuncianteId, descricao, link, nivelServico } = req.body;
  try {
    const anuncio = new Anuncio({ anuncianteId, descricao, imagem: req.file.filename, link, nivelServico });
    await anuncio.save();
    res.send(anuncio);
  } catch (err) {
    res.status(400).send({ error: 'Erro ao criar anúncio' , err});
  }
});

router.get("/lastImagePath", async(req, res) => {
  try {
      const dirPath = path.join(__dirname, "../uploads");
      const files = await fs.promises.readdir(dirPath);
      const lastFile = files[files.length - 1];
      const lastImagePath = `${lastFile}`; // ou outro caminho de acordo com sua configuração
      res.status(200).json({ lastImagePath });
  } catch (error) {
      res.status(400).json({ msg: error.message });
  }
});

// Rota de GET para buscar todos os anúncios
router.get('/', async (req, res) => {
    try {
      const anuncios = await Anuncio.find();
      res.send(anuncios);
    } catch (err) {
      res.status(500).send({ error: 'Erro ao buscar anúncios' });
    }
  });

  router.get('/nivel-servico/:nivelServico', async (req, res) => {
    const nivelServico = req.params.nivelServico;
    try {
      const anuncios = await Anuncio.find({ nivelServico: nivelServico });
      res.send(anuncios);
    } catch (err) {
      res.status(500).send({ error: 'Erro ao buscar anúncios' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const anuncio = await Anuncio.findByIdAndDelete(req.params.id);
      if (!anuncio) {
        return res.status(404).send({ error: 'Anúncio não encontrado' });
      }
      res.send({ message: 'Anúncio deletado com sucesso' });
    } catch (err) {
      res.status(500).send({ error: 'Erro ao deletar anúncio' });
    }
  });

module.exports = router; 
