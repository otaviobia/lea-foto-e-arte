import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Sale = sequelize.define('Sale', {
  canal_venda: {
    type: DataTypes.ENUM('shopee', 'artesanou', 'akeba', 'whatsapp', 'outro'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('aguardando_pagamento', 'em_producao', 'enviado', 'concluido'),
    defaultValue: 'aguardando_pagamento'
  },
  produtos_texto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  valor_gastos: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false
  },
  link_xml_nf: {
    type: DataTypes.STRING,
    allowNull: true
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data_venda: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default Sale;