import express from 'express';
import { Sale, Customer } from '../models/index.js';
import { verifyToken } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// 1. Configuração do Multer (Onde e como salvar os arquivos)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pasta onde será salvo
  },
  filename: function (req, file, cb) {
    // Cria um nome único: nf-16848292-numeroaleatorio.xml
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'nf-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 2. Rota para CRIAR Venda (POST)
// O upload.single('xml_nf') intercepta o arquivo que enviamos do React
router.post('/', verifyToken, upload.single('xml_nf'), async (req, res) => {
  try {
    const vendaData = { ...req.body };

    // Se o multer capturou um arquivo, montamos a URL final para salvar no banco
    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      vendaData.link_xml_nf = fileUrl;
    }

    // Tratamento contra o erro "null" do FormData
    if (!vendaData.valor_gastos || vendaData.valor_gastos === '') vendaData.valor_gastos = 0;
    if (!vendaData.observacoes || vendaData.observacoes === 'null') vendaData.observacoes = '';

    const newSale = await Sale.create(vendaData);
    res.status(201).json({ sale: newSale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar venda' });
  }
});

// 3. Rota para EDITAR Venda (PUT) -> Resolve o problema de não salvar a edição!
router.put('/:id', verifyToken, upload.single('xml_nf'), async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    
    if (!sale) {
      return res.status(404).json({ erro: 'Venda não encontrada' });
    }

    const vendaData = { ...req.body };

    // Se a pessoa enviou um NOVO arquivo na edição, atualiza a URL
    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      vendaData.link_xml_nf = fileUrl;
    }

    // Tratamento contra o erro "null" do FormData
    if (!vendaData.valor_gastos || vendaData.valor_gastos === '') vendaData.valor_gastos = 0;
    if (!vendaData.observacoes || vendaData.observacoes === 'null') vendaData.observacoes = '';

    await sale.update(vendaData);
    res.json({ sale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar venda' });
  }
});

// 4. Rota para LISTAR Vendas (GET)
router.get('/', verifyToken, async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [{
        model: Customer,
        attributes: ['id', 'name', 'whatsapp', 'cpf']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ sales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar vendas' });
  }
});

// 5. Rota para DELETAR Venda (DELETE)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const linhasDeletadas = await Sale.destroy({ where: { id: req.params.id } });
    
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