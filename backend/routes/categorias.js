import express from 'express';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

const router = express.Router();

// Rota para criar uma nova categoria (cria a slug automaticamente a partir do nome)
// TODO: Adicionar autenticação e autorização para esta rota
router.post('/', async (req, res) => {
  const { name, image } = req.body;

  if (!name) {
    return res.status(400).json({ erro: 'O nome da categoria é obrigatório' });
  }

  try {
    const slug = name.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const newCategory = await Category.create({ name, slug, image });
    res.status(201).json({ categoria: newCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar categoria' });
  }
});

// Rota para buscar todas as categorias, ordenadas por nome
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

// Rota para remover uma categoria por id e colocar todos os produtos associados a ela como "sem categoria"
// TODO: Permitir apenas usuários autenticados removerem categorias
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    // Atualiza todos os produtos que têm essa categoria para null
    await Product.update({ categoryId: null }, { where: { categoryId: id } });

    // Remove a categoria
    await category.destroy();

    res.json({ mensagem: 'Categoria removida com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao remover categoria' });
  }
});

export default router;