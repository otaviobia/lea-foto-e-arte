import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Hero = sequelize.define('Hero', {
  id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true,
  },
  image: {
    type:      DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type:      DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  order: {
    type:      DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName:  'heros',
  timestamps: false,
});

export default Hero;