import express from 'express';
import { Hero } from '../models/index.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET: Buscar banners ativos (Para a Home)
router.get('/ativos', async (req, res) => {
  try {
    const heros = await Hero.findAll({
      where: { isActive: true },
      order: [['order', 'ASC']]
    });
    res.json({ heros });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar banners' });
  }
});

// GET: Buscar TODOS os banners (Para o Admin)
router.get('/', async (req, res) => {
  try {
    const heros = await Hero.findAll({ order: [['order', 'ASC']] });
    res.json({ heros });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar banners' });
  }
});

// POST: Criar novo banner
router.post('/', verifyToken, async (req, res) => {
  try {
    const newHero = await Hero.create(req.body);
    res.status(201).json({ hero: newHero });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar banner' });
  }
});

// PUT: Reordenar banners
router.put('/reordenar', verifyToken, async (req, res) => {
  const { listaOrdenada } = req.body;

  if (!listaOrdenada || !Array.isArray(listaOrdenada)) {
    return res.status(400).json({ erro: 'Lista de ordenação inválida' });
  }

  try {
    await Promise.all(
      listaOrdenada.map(item => 
        Hero.update(
          { order: item.order }, 
          { where: { id: item.id } }
        )
      )
    );

    res.json({ mensagem: 'Nova ordenação dos banners salva com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao reordenar banners' });
  }
});

// PUT: Atualizar banner (ordem, ativo/inativo, imagem)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    await Hero.update(req.body, { where: { id: req.params.id } });
    res.json({ mensagem: 'Banner atualizado' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar banner' });
  }
});

// DELETE: Remover banner
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Hero.destroy({ where: { id: req.params.id } });
    res.json({ mensagem: 'Banner removido' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover banner' });
  }
});

export default router;