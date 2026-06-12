import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Rota para buscar todos os produtos, ordenados por título
router.get('/', async (req, res) => {
  try {
    const rows = await Product.findAll({
      order: [['title', 'ASC']],
    });

    res.json({ produtos: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

// Rota para buscar um produto pela slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({
      where: { slug },
    });

    if (!product) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json({ produto: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
});

// Rota para buscar produtos por categoria
router.get('/categoria/:categorySlug', async (req, res) => {
  const { categorySlug } = req.params;

  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        where: { slug: categorySlug },
        attributes: [], // Não precisamos dos dados da categoria aqui
      },
      order: [['title', 'ASC']],
    });

    res.json({ produtos: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos por categoria' });
  }
});

// Rota para criar um novo produto (cria a slug automaticamente a partir do título)
// TODO: Permitir apenas usuários autenticados criarem produtos
router.post('/', async (req, res) => {
  const { title, description, price, shopeeLink, images, categoryId } = req.body;

  try {
    const slug = title.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const newProduct = await Product.create({
      slug,
      title,
      description,
      price,
      shopeeLink,
      images,
      categoryId,
    });

    res.status(201).json({ produto: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
});

export default router;