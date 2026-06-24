import express from 'express';
import { Sale, Customer } from '../models/index.js';
import { verifyToken } from '../middleware/auth.js';
import { createUpload } from '../middleware/upload.js';

const router = express.Router();
const upload = createUpload('nf');

// Cria venda [RESTRITA]
router.post('/', verifyToken, upload.single('xml_nf'), async (req, res) => {
  try {
    const vendaData = { ...req.body };

    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      vendaData.link_xml_nf = fileUrl;
    }

    // tratamento contra nulls
    if (!vendaData.valor_gastos || vendaData.valor_gastos === '')
      vendaData.valor_gastos = 0;
    if (!vendaData.observacoes || vendaData.observacoes === 'null')
      vendaData.observacoes = '';

    const newSale = await Sale.create(vendaData);
    res.status(201).json({ sale: newSale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar venda' });
  }
});

// Recupera vendas [RESTRITA]
router.get('/', verifyToken, async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'whatsapp', 'cpf'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ sales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar vendas' });
  }
});

// Atualiza venda por id [RESTRITA]
router.put('/:id', verifyToken, upload.single('xml_nf'), async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);

    if (!sale) {
      return res.status(404).json({ erro: 'Venda não encontrada' });
    }

    const vendaData = { ...req.body };

    // se a pessoa enviou um novo arquivo na edição, atualiza a URL
    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      vendaData.link_xml_nf = fileUrl;
    }

    // tratamento contra nulls
    if (!vendaData.valor_gastos || vendaData.valor_gastos === '')
      vendaData.valor_gastos = 0;
    if (!vendaData.observacoes || vendaData.observacoes === 'null')
      vendaData.observacoes = '';

    await sale.update(vendaData);
    res.json({ sale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar venda' });
  }
});

// Deleta venda por id [RESTRITA]
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const linhasDeletadas = await Sale.destroy({
      where: { id: req.params.id },
    });

    if (linhasDeletadas === 0) {
      return res.status(404).json({ erro: 'Venda não encontrada.' });
    }

    res.json({ message: 'Venda deletada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar venda.' });
  }
});

export default router;
