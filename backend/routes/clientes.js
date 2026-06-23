import express from 'express';
import { Customer } from '../models/index.js';
import { verifyToken } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = express.Router();

// Rota para criar um cliente
router.post('/', verifyToken, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ erro: 'O nome do cliente é obrigatório' });
  }

  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({ customer: newCustomer });
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        erro: 'Já existe um cliente cadastrado com esse CPF ou E-mail.' 
      });
    }
    res.status(500).json({ erro: 'Erro interno ao criar cliente' });
  }
});

// Rota para buscar todos os clientes ordenado por nome
router.get('/', verifyToken, async (req, res) => {
  try {
    const rows = await Customer.findAll({
      order: [['name', 'ASC']],
    });

    res.json({ clientes: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
});

// Rota para buscar clientes por nome (parcial)
router.get('/search/:name', async (req, res) => {
  const { name } = req.params;
  
  const limitParam = parseInt(req.query.limit, 10) || undefined;

  try {
    const customers = await Customer.findAll({
      where: { 
        name: { [Op.like]: `%${name}%` } 
      },
      limit: limitParam
    });

    res.json({ clientes: customers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
});

// Rota para deletar um cliente por ID
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const linhasDeletadas = await Customer.destroy({
      where: { id: id }
    });

    if (linhasDeletadas === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }

    res.json({ message: 'Cliente deletado com sucesso!' });
  } catch (err) {
    console.error(err);
    
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ 
        erro: 'Não é possível deletar este cliente pois existem vendas associadas a ele no sistema.' 
      });
    }

    res.status(500).json({ erro: 'Erro interno ao deletar cliente.' });
  }
});

// Rota para editar um cliente por ID
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!req.body.name) {
    return res.status(400).json({ erro: 'O nome do cliente é obrigatório' });
  }

  try {
    const customer = await Customer.findByPk(id);
    
    if (!customer) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    // O update substitui os valores antigos pelos novos que vieram no req.body
    await customer.update(req.body);
    
    res.json({ customer });
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        erro: 'Já existe um cliente cadastrado com esse CPF ou E-mail.' 
      });
    }
    res.status(500).json({ erro: 'Erro interno ao atualizar cliente' });
  }
});

export default router;