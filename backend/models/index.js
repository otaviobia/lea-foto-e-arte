// Index simplifica imports de models e cria as constraints de foreign key
import Category from './Category.js';
import Product from './Product.js';
import Hero from './Hero.js';
import Admin from './Admin.js';
import Customer from './Customer.js';
import Sale from './Sale.js';

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
});

Customer.hasMany(Sale, { foreignKey: 'customerId' });
Sale.belongsTo(Customer, { foreignKey: 'customerId' });

export { Category, Product, Hero, Admin, Customer, Sale };
