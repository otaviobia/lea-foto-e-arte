import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Hero = sequelize.define(
  'Hero',
  {
    // primary key é id (padrão do sequelize)
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'heros',
    timestamps: false,
  }
);

export default Hero;
