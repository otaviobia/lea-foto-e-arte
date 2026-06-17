import Category from './Category.js';
import Product from './Product.js';
import Hero from './Hero.js';

Product.belongsTo(Category, { 
  foreignKey: 'categoryId',
  as: 'category'
});

Category.hasMany(Product, { 
  foreignKey: 'categoryId',
  as: 'products'
});

export { Category, Product, Hero };