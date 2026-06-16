// seed.js
import sequelize from './config/database.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

async function seedDatabase() {
  try {
    // Autentica no banco
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');

    // Sincroniza os modelos (CUIDADO: force: true apaga todas as tabelas e recria)
    // Se não quiser apagar os dados existentes, remova o { force: true }
    await sequelize.sync({ force: true });
    console.log('Tabelas sincronizadas.');

    // 1. Criar Categorias
    const categorias = await Category.bulkCreate([
      { slug: 'papelaria', name: 'Papelaria', image: 'papelaria-capa.jpg' },
      { slug: 'canecas', name: 'Canecas', image: 'canecas-capa.jpg' },
      { slug: 'decoracao', name: 'Decoração', image: 'decoracao-capa.jpg' },
    ]);
    console.log('Categorias criadas!');

    // 2. Criar Produtos associados às categorias criadas
    await Product.bulkCreate([
      {
        slug: 'caderno-fofo-gatinho',
        title: 'Caderno Fofo de Gatinho',
        description: 'Um caderno universitário perfeito para suas anotações com estampa de gatinho.',
        price: 35.90,
        shopeeLink: 'https://shopee.com.br/exemplo1',
        images: ['caderno-gat-1.jpg', 'caderno-gat-2.jpg'],
        categoryId: categorias[0].id // ID da Papelaria
      },
      {
        slug: 'caneca-magica-dev',
        title: 'Caneca Mágica Desenvolvedor',
        description: 'Caneca que revela o código quando você coloca café quente!',
        price: 49.99,
        shopeeLink: 'https://shopee.com.br/exemplo2',
        images: ['caneca-dev-1.jpg'],
        categoryId: categorias[1].id // ID de Canecas
      },
      {
        slug: 'quadro-decorativo-react',
        title: 'Quadro Decorativo ReactJS',
        description: 'Quadro minimalista com o logo do React.',
        price: 29.90,
        shopeeLink: 'https://shopee.com.br/exemplo3',
        images: ['quadro-react.jpg'],
        categoryId: categorias[2].id // ID de Decoração
      },
      {
        slug: 'produto-sem-categoria',
        title: 'Adesivos Sortidos',
        description: 'Pacote com 50 adesivos sortidos para notebook.',
        price: 15.00,
        shopeeLink: 'https://shopee.com.br/exemplo4',
        images: ['adesivos.jpg'],
        categoryId: null // Testando a permissão de produto sem categoria
      }
    ]);
    console.log('Produtos criados!');

    console.log('✅ Mock data inserido com sucesso!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erro ao inserir dados:', error);
    process.exit(1);
  }
}

seedDatabase();