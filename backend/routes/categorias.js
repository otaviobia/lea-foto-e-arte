import express from 'express';
import { Category, Product } from '../models/index.js';
import { verifyToken } from '../middleware/auth.js';
import { createUpload } from '../middleware/upload.js';

const router = express.Router();
const upload = createUpload('categoria');

// Cria uma nova categoria [RESTRITA]
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ erro: 'O nome da categoria é obrigatório' });
  }

  try {
    let imageUrl = req.body.image || null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    // cria a slug automaticamente a partir do nome
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const newCategory = await Category.create({ name, slug, image: imageUrl });
    res.status(201).json({ categoria: newCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar categoria' });
  }
});

// Busca todas as categorias, ordenadas por nome [PÚBLICA]
router.get('/', async (req, res) => {
  try {
    const rows = await Category.findAll({
      order: [['name', 'ASC']],
    });

    res.json({ categorias: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar categorias' });
  }
});

// Busca apenas categorias em destaque para Home [PÚBLICA]
router.get('/destaques', async (req, res) => {
  try {
    const destaques = await Category.findAll({
      where: { isFeatured: true },
      order: [['featuredOrder', 'ASC']],
      include: {
        model: Product,
        as: 'products',
      },
    });
    res.json({ categorias: destaques });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar destaques' });
  }
});

// Liga/desliga o destaque de uma categoria específica [RESTRITA]
router.put('/:id/destaque', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { isFeatured } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    // ao desativar colocar na ordem 0 (estado default)
    const featuredOrder = isFeatured ? category.featuredOrder : 0;

    await category.update({ isFeatured, featuredOrder });
    res.json({
      mensagem: 'Status de destaque atualizado com sucesso!',
      categoria: category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar destaque da categoria' });
  }
});

// Salva a nova ordem das categorias destacadas [RESTRITA]
// Recebe { listaOrdenada: [ { id: 1, ordem: 0 }, { id: 3, ordem: 1 } ] }
router.put('/reordenar-destaques', verifyToken, async (req, res) => {
  const { listaOrdenada } = req.body;

  if (!listaOrdenada || !Array.isArray(listaOrdenada)) {
    return res.status(400).json({ erro: 'Lista de ordenação inválida' });
  }

  try {
    await Promise.all(
      listaOrdenada.map(item =>
        Category.update(
          { featuredOrder: item.ordem },
          { where: { id: item.id } }
        )
      )
    );

    res.json({ mensagem: 'Nova ordenação das categorias salva com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao reordenar categorias' });
  }
});

// Busca uma categoria por slug [PÚBLICA]
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const category = await Category.findOne({
      where: { slug: slug },
    });

    if (!category) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    res.json({ categoria: category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar categoria' });
  }
});

// Remove uma categoria por id e coloca todos os produtos associados a ela como "sem categoria" [RESTRITA]
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    // atualiza todos os produtos que têm essa categoria para null e remove
    await Product.update({ categoryId: null }, { where: { categoryId: id } });
    await category.destroy();

    res.json({ mensagem: 'Categoria removida com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao remover categoria' });
  }
});

export default router;
