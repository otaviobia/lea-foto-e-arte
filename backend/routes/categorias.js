import express from 'express';
import { Category, Product } from '../models/index.js';

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

// Rota para buscar apenas categorias em destaque (Home)
router.get('/destaques', async (req, res) => {
  try {
    const destaques = await Category.findAll({
      where: { isFeatured: true },
      order: [['featuredOrder', 'ASC']],
      include: {
        model: Product,
        as: 'products',
      }
    });
    res.json({ categorias: destaques });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar destaques' });
  }
});

// 2. Rota para ligar/desligar o destaque de uma categoria específica (Admin)
router.put('/:id/destaque', async (req, res) => {
  const { id } = req.params;
  const { isFeatured } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    // Se estiver desativando o destaque, podemos resetar a ordem para 0
    const featuredOrder = isFeatured ? category.featuredOrder : 0;

    await category.update({ isFeatured, featuredOrder });
    res.json({ mensagem: 'Status de destaque atualizado com sucesso!', categoria: category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar destaque da categoria' });
  }
});

// 3. Rota para salvar a nova ordem das categorias destacadas (Admin)
// Espera receber no body: { listaOrdenada: [ { id: 1, ordem: 0 }, { id: 3, ordem: 1 } ] }
router.put('/reordenar-destaques', async (req, res) => {
  const { listaOrdenada } = req.body;

  if (!listaOrdenada || !Array.isArray(listaOrdenada)) {
    return res.status(400).json({ erro: 'Lista de ordenação inválida' });
  }

  try {
    // Executa múltiplos updates em paralelo para atualizar a ordem de cada uma
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

// Rota para buscar apenas uma categoria por slug (pra saber o nome bonito)
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const category = await Category.findOne({
      where: { slug: slug }
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