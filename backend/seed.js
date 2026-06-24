import {
  Category,
  Product,
  Hero,
  Admin,
  Customer,
  Sale,
} from './models/index.js';
import bcrypt from 'bcrypt';
import sequelize from './config/database.js';

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');

    await sequelize.sync({ force: true }); // apaga todos os dados e recria
    console.log('Tabelas sincronizadas.');

    const admin = await Admin.create({
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
    });
    console.log('Admin criado!');

    const categorias = await Category.bulkCreate([
      {
        slug: 'fauna-brasileira',
        name: 'Fauna Brasileira',
        image:
          'https://d2cp7y84leain9.cloudfront.net/17/pastas/thumb/folder-1778957287801.webp',
        isFeatured: true,
        featuredOrder: 0,
      },
      {
        slug: 'dinossauros',
        name: 'Dinossauros',
        image:
          'https://d2cp7y84leain9.cloudfront.net/17/pastas/thumb/folder-1778957182579.webp',
        isFeatured: true,
        featuredOrder: 1,
      },
      {
        slug: 'natal',
        name: 'Natal',
        image:
          'https://d2cp7y84leain9.cloudfront.net/17/pastas/thumb/folder-1778963495180.webp',
        isFeatured: false,
        featuredOrder: 2,
      },
    ]);
    console.log('Categorias criadas!');

    await Product.bulkCreate([
      {
        slug: 'topo-de-bolo-fauna-brasileira',
        title: 'Topo de Bolo Fauna Brasileira',
        description:
          'Topo de Bolo personalizado impresso em papel glossy 230g, colado em canudo de papel colorido. Acompanha 10 toppers para colocar no bolo, docinhos ou cupcakes, colados em palito plástico branco. Entre em contato e monte seu KIT FESTA com todos os itens combinando com essa arte. Todos os produtos da loja Léa Foto e Arte podem ser feitos com esses desenhos (convite, tubete, bandeirola, forminhas, caixinhas). Ao enviar o pedido, envie imediatamente o nome e a idade que serão colocados no topo de bolo.',
        price: 47.3,
        shopeeLink:
          'https://shopee.com.br/Topo-de-Bolo-Fauna-Brasileira-i.315535138.20698026377',
        images: [
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m5vyr3hwjrkg00@resize_w900_nl.webp',
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m5vyr3hwgyfk6b@resize_w900_nl.webp',
        ],
        categoryId: categorias[0].id, // fauna brasileira
      },
      {
        slug: 'toppers-fauna-brasileira',
        title: 'Toppers Fauna Brasileira',
        description:
          'Toppers para festa infantil tema Fauna Brasileira. Toppers para cupcake ou docinho, com recorte especial, colado no palitinho branco. Impresso em papel glossy 230g',
        price: 1.0,
        shopeeLink:
          'https://shopee.com.br/Toppers-Fauna-Brasileira-i.315535138.23098202072',
        images: [
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m68al7efgrlec1@resize_w900_nl.webp',
        ],
        categoryId: categorias[0].id, // fauna brasileira
      },
      {
        slug: 'tubete-fauna-brasileira',
        title: 'Tubete Fauna Brasileira',
        description: 'Tubete para sua festa infantil no tema Fauna Brasileira.',
        price: 3.9,
        shopeeLink:
          'https://shopee.com.br/Tubete-Fauna-Brasileira-i.315535138.20498029697',
        images: [
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m6d3n0rczpmtf0@resize_w900_nl.webp',
        ],
        categoryId: categorias[0].id, // fauna brasileira
      },
      {
        slug: 'forminha-festa-fauna-brasileira',
        title: 'Forminha Festa Fauna Brasileira',
        description: 'Forminha Festa Fauna Brasileira.',
        price: 0.75,
        shopeeLink:
          'https://shopee.com.br/Forminha-Festa-Fauna-Brasileira-i.315535138.22294455156',
        images: [
          'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mf2gt0qbo5c7c4@resize_w900_nl.webp',
        ],
        categoryId: categorias[0].id, // fauna brasileira
      },
      {
        slug: 'topper-docinhos-festa-dinossauros',
        title: 'Topper para Docinhos Festa Dinossauros',
        description:
          '30 ou 50 Toppers para cupcake ou docinho, com recorte especial, colado no palitinho branco, tema dinossauros. Impresso em papel glossy 230g',
        price: 1.0,
        shopeeLink:
          'https://shopee.com.br/Topper-para-Docinhos-Festa-Dinossauros-i.315535138.23998437619',
        images: [
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m9eh83s5rqpu88@resize_w450_nl.webp',
        ],
        categoryId: categorias[1].id, // dinossauro
      },
      {
        slug: 'topo-de-bolo-personalizado',
        title: 'Topo de Bolo Personalizado Festa Dinossauros',
        description:
          'Topo de Bolo personalizado impresso em papel glossy 230g, colado em canudo de papel colorido, no tema dinossauro. Acompanha 10 toppers para colocar no bolo, docinhos ou cupcakes, colados em palito plástico branco Entre em contato e monte seu KIT FESTA com todos os itens combinando com essa arte. Todos os produtos da loja Léa Foto e Arte podem ser feitos com esses desenhos (convite, tubete, bandeirola, forminhas, caixinhas). Ao enviar o pedido, envie imediatamente o nome e a idade que serão colocados no topo de bolo',
        price: 43.0,
        shopeeLink:
          'https://shopee.com.br/Topo-de-Bolo-Personalizado-Festa-Dinossauros-i.315535138.23193956838',
        images: [
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m9eh83s5t5aa0c@resize_w450_nl.webp',
        ],
        categoryId: categorias[1].id, // dinossauro
      },
      {
        slug: 'forminha-docinhos-dinossauro',
        title: 'Forminha para Docinhos Festa Dinossauros',
        description:
          'Forminha Festa Infantil tema Dinossauros A forminha tem 3,3 x 3,3 de base e 2,4 cm de altura Impressão da forminha frente e verso, em papel offset 240. Impressão dos apliques no tema, em papel glossy 230g',
        price: 1.5,
        shopeeLink:
          'https://shopee.com.br/Forminha-para-Docinhos-Festa-Dinossauros-i.315535138.23998437541',
        images: [
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m9eh83s5jbb6f7@resize_w450_nl.webp',
        ],
        categoryId: categorias[1].id, // dinossauro
      },
      {
        slug: 'caixinha-milk-festa-dinossauros',
        title: 'Caixinha Milk Festa Infantil Dinossauros',
        description:
          'Caixinha Milk Festa Dinossauros Impressa em papel offset 240g. Aplique no tema impresso em papel glossy com brilho. A caixa é enviada desmontada, não precisa de cola para a montagem, é só encaixe. Fita enviada já cortada, para o cliente fazer o laço após colocar as guloseimas na caixinha. Medida da base: 6 x 6cm Altura: 12cm Envie o nome e a idade assim que fizer o pedido.',
        price: 6.5,
        shopeeLink:
          'https://shopee.com.br/Caixinha-Milk-Festa-Infantil-Dinossauros-i.315535138.23293956779',
        images: [
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m9ehhbrxs4xucd@resize_w450_nl.webp',
        ],
        categoryId: categorias[1].id, // dinossauro
      },
    ]);
    console.log('Produtos criados!');

    // Criando os Banners (Heros)
    await Hero.bulkCreate([
      {
        image: 'https://i.imgur.com/f8RJskf.png',
        isActive: true,
        order: 0,
      },
      {
        image: 'https://i.imgur.com/BTfMyuL.png',
        isActive: true,
        order: 1,
      },
      {
        image:
          'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m9rbvvbqkzlld0@resize_w450_nl.webp',
        isActive: false,
        order: 2,
      },
    ]);
    console.log('Heros (Banners) criados!');

    // Criando os Clientes
    const clientes = await Customer.bulkCreate([
      {
        name: 'Maria Fernanda Silva',
        cpf: '111.222.333-44',
        email: 'maria.fernanda@email.com',
        whatsapp: '(11) 99999-0001',
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        numero: '123',
        complemento: 'Apto 42',
        bairro: 'Sé',
        cidade: 'São Paulo',
        estado: 'SP',
      },
      {
        name: 'João Pedro de Souza',
        cpf: '555.666.777-88',
        email: 'joao.pedro@email.com',
        whatsapp: '(16) 98888-0002',
        cep: '13560-000',
        logradouro: 'Avenida São Carlos',
        numero: '1000',
        bairro: 'Centro',
        cidade: 'São Carlos',
        estado: 'SP',
      },
      {
        name: 'Ana Beatriz Oliveira', // Cliente com dados parciais para testar
        whatsapp: '(21) 97777-0003',
      },
    ]);
    console.log('Clientes criados!');

    // Criando as Vendas
    await Sale.bulkCreate([
      {
        canal_venda: 'shopee',
        status: 'concluido',
        produtos_texto:
          '1x Topo de Bolo Fauna Brasileira, 50x Toppers Fauna Brasileira',
        valor_total: 97.3,
        valor_gastos: 18.5, // Taxa da Shopee + Custo material
        link_xml_nf: 'https://seuservidor.com/notas/nf_12345.xml',
        observacoes: 'Cliente pediu para embalar para presente. Envio rápido.',
        customerId: clientes[0].id, // Maria Fernanda
      },
      {
        canal_venda: 'whatsapp',
        status: 'aguardando_pagamento',
        produtos_texto: '10x Caixinha Milk Festa Infantil Dinossauros',
        valor_total: 65.0,
        valor_gastos: 12.0, // Apenas custo material (sem taxa de canal)
        link_xml_nf: null, // Nota ainda não gerada
        observacoes: 'Aguardando envio do comprovante PIX pelo WhatsApp.',
        customerId: clientes[1].id, // João Pedro
      },
    ]);
    console.log('Vendas criadas!');

    console.log('✅ Mock data inserido com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inserir dados:', error);
    process.exit(1);
  }
}

seedDatabase();
