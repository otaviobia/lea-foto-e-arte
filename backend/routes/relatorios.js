import express from 'express';
import { Sale } from '../models/index.js';
import { verifyToken } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = express.Router();

// Busca estatísticas financeiras com filtro de data opcional [RESTRITA]
router.get('/financeiro', verifyToken, async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const whereClause = {};

    // se o usuário passou filtros de data, montamos a busca temporal
    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt[Op.gte] = new Date(`${startDate}T00:00:00.000Z`);
      }
      if (endDate) {
        whereClause.createdAt[Op.lte] = new Date(`${endDate}T23:59:59.999Z`);
      }
    }

    const sales = await Sale.findAll({ where: whereClause });

    let faturamentoTotal = 0;
    let gastosTotais = 0;
    const resumoCanais = {};

    sales.forEach(venda => {
      const total = parseFloat(venda.valor_total) || 0;
      const gasto = parseFloat(venda.valor_gastos) || 0;

      faturamentoTotal += total;
      gastosTotais += gasto;

      // agrupa também o faturamento por canal de venda
      if (!resumoCanais[venda.canal_venda]) {
        resumoCanais[venda.canal_venda] = { faturamento: 0, quantidade: 0 };
      }
      resumoCanais[venda.canal_venda].faturamento += total;
      resumoCanais[venda.canal_venda].quantidade += 1;
    });

    const lucroTotal = faturamentoTotal - gastosTotais;

    res.json({
      resumo: {
        totalVendas: sales.length,
        faturamento: faturamentoTotal,
        gastos: gastosTotais,
        lucro: lucroTotal,
      },
      canais: resumoCanais,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao gerar relatório financeiro' });
  }
});

export default router;
