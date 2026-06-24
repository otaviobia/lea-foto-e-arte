import express from 'express';
import { Hero } from '../models/index.js';
import { verifyToken } from '../middleware/auth.js';
import { createUpload } from '../middleware/upload.js';

const router = express.Router();
const upload = createUpload('hero');

// Busca banners ativos para a Home [PÚBLICA]
router.get('/ativos', async (req, res) => {
  try {
    const heros = await Hero.findAll({
      where: { isActive: true },
      order: [['order', 'ASC']],
    });
    res.json({ heros });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar banners' });
  }
});

// Busca TODOS os banners [PÚBLICA]
router.get('/', async (req, res) => {
  try {
    const heros = await Hero.findAll({ order: [['order', 'ASC']] });
    res.json({ heros });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar banners' });
  }
});

// Cria novo banner [RESTRITA]
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const heroData = { ...req.body };
    if (req.file) {
      heroData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    const newHero = await Hero.create(heroData);
    res.status(201).json({ hero: newHero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar banner' });
  }
});

// Reordena banners [RESTRITA]
router.put('/reordenar', verifyToken, async (req, res) => {
  const { listaOrdenada } = req.body;

  if (!listaOrdenada || !Array.isArray(listaOrdenada)) {
    return res.status(400).json({ erro: 'Lista de ordenação inválida' });
  }

  try {
    await Promise.all(
      listaOrdenada.map(item =>
        Hero.update({ order: item.order }, { where: { id: item.id } })
      )
    );

    res.json({ mensagem: 'Nova ordenação dos banners salva com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao reordenar banners' });
  }
});

// Atualiza banners (ordem, ativo/inativo, imagem) [RESTRITA]
router.put('/:id', verifyToken, async (req, res) => {
  try {
    await Hero.update(req.body, { where: { id: req.params.id } });
    res.json({ mensagem: 'Banner atualizado' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar banner' });
  }
});

// Remove banner por id [RESTRITA]
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Hero.destroy({ where: { id: req.params.id } });
    res.json({ mensagem: 'Banner removido' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover banner' });
  }
});

export default router;
