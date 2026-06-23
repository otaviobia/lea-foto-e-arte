# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Made login token expire in 7d instead of 1hr
- Made some pages cover more of the screen when low on content
- Added related products to product page
- Prettified FAQ section
- Added WhatsApp circle
- Added multer for uploads
- Made testimonies div be wavy again
- Fully integrated Customers, Sales and Reports
- Used swiper to create image carousel on product page
- Integrated Admin Login and Logout
- Added auth verification to backend routes and frontend pages
- Created admin model, controller and middleware (using bcrypt and jwt)
- Add the 5 admin pages: login, layout, products, sales and dashboard
- Made category carousel fetch the categories from API
- Added product grid page accessible from categories
- New category route to fetch only one by slug
- Commented out search function
- Tweak product page sizings
- Display price with comma instead of dot
- Make seeding contain real products
- Changed seeding of backend
- Added product page
- Added route for product (create, get)
- Moved CHANGELOD.md to root folder
- Tweaked "Ver todos os temas" button
- Connected DB with Backend and Frontend
- Added fallback for Loading and NotFound pages
- Added Produto.jsx and Produtos.jsx
- Added route for category (create, get, delete)
- Added Express boilerplate
- Added docker compose with Postgres
- Added mock data for categories
- Added Comprar por Tema page
- Added a Container component for limited width pages
- Added Home, NotFound, Politicas and Sobre pages
- Added RootLayout with header and footer
- Added React Router
- Added Header and Footer
- Added CategoryCarousel
- Added responsive Hero
- Created Testimonies
- Added React-Icons
- Created ProductCard and ProductCarousel, using the Swiper lib
- Added custom colors and fonts to Tailwind in index.css
- Added page title and favicon in "index.html"
- Installed Tailwind following: https://tailwindcss.com/docs/installation/using-vite
- Created boilerplate React v19.2.6 project using Vite v8.0.12 with Node LTS v24.16.0
