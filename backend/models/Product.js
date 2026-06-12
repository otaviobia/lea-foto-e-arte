import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true,
  },
  slug: {
    type:      DataTypes.STRING,
    allowNull: false,
    unique:    true,
  },
  title: {
    type:      DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type:      DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type:      DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shopeeLink: {
    type:      DataTypes.STRING,
    allowNull: true,
  },
  images: {
    type:      DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  categoryId: {
    type:      DataTypes.INTEGER,
    allowNull: true, // Produtos sem categoria são permitidos
    references: {
      model: 'categories',
      key:   'id',
    },
  },
}, {
  tableName:  'products',
  timestamps: false,
});

export default Product;