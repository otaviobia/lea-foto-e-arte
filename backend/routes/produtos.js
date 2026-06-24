import express from 'express';
import { Category, Product } from '../models/index.js';
import { verifyToken } from '../middleware/auth.js';
import { createUpload } from '../middleware/upload.js';
import { Op } from 'sequelize';

const router = express.Router();
const upload = createUpload('produto');

// Buscar todos os produtos, ordenados por título [PÚBLICA]
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

// Busca produtos por nome (busca parcial, case insensitive) [PÚBLICA]
router.get('/busca/:query', async (req, res) => {
  const { query } = req.params;
  const limitParam = parseInt(req.query.limit, 10) || undefined;

  try {
    const products = await Product.findAll({
      where: {
        title: { [Op.iLike]: `%${query}%` },
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name', 'slug'],
      },
      order: [['title', 'ASC']],
      limit: limitParam,
    });

    res.json({ produtos: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

// Buscar um produto pela slug [PÚBLICA]
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({
      where: { slug },
      include: {
        model: Category,
        as: 'category',
      },
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

// Busca produtos por categoria [PÚBLICA]
router.get('/categoria/:categorySlug', async (req, res) => {
  const { categorySlug } = req.params;

  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        where: { slug: categorySlug },
        attributes: [],
      },
      order: [['title', 'ASC']],
    });

    res.json({ produtos: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos por categoria' });
  }
});

// Cria um novo produto [RESTRITA]
router.post('/', verifyToken, upload.array('images'), async (req, res) => {
  const { title, description, price, shopeeLink, categoryId } = req.body;

  try {
    // cria a slug automaticamente a partir do título
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(
        file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
    }

    const newProduct = await Product.create({
      slug,
      title,
      description,
      price,
      shopeeLink,
      images: imageUrls,
      categoryId,
    });

    res.status(201).json({ produto: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
});

// Atualiza um produto existente [RESTRITA]
router.put('/:id', verifyToken, upload.array('images'), async (req, res) => {
  const { id } = req.params;
  const { title, description, price, shopeeLink, categoryId } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    // Se o título mudou, atualizamos o slug também
    let slug = product.slug;
    if (title && title !== product.title) {
      slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    }

    // mantém as imagens antigas por padrão - se subiu imagens novas, substitui
    let imageUrls = product.images;
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(
        file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
    }

    await product.update({
      slug,
      title,
      description,
      price,
      shopeeLink,
      images: imageUrls,
      categoryId,
    });

    res.json({ produto: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
});

// Remove um produto [RESTRITA]
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    await product.destroy();

    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao remover produto' });
  }
});

export default router;
