import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import './index.css'

import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import NotFound from './components/NotFound.jsx'
import Politicas from './pages/Politicas.jsx'
import ComprarPorTema from './pages/ComprarPorTema.jsx'
import Produto from './pages/Produto.jsx'
import { productLoader } from './api/productLoader.js'
import Produtos from './pages/Produtos.jsx'
import Loading from './components/Loading.jsx'
import AdminLogin from './pages/Admin/Login.jsx'
import AdminLayout from './pages/Admin/Layout.jsx'
import AdminVendas from './pages/Admin/Vendas.jsx'
import AdminProdutos from './pages/Admin/Produtos.jsx'
import AdminRelatorios from './pages/Admin/Relatorios.jsx'
import AdminRootLayout from './layouts/AdminRootLayout'
import AdminClientes from './pages/Admin/Clientes.jsx'

const router = createBrowserRouter([
  { // Rotas de usuário
    Component: RootLayout,
    hydrateFallbackElement: <Loading />,
    children: [
      { index: true, Component: Home },
      { path: 'sobre', Component: Sobre },
      { 
        path: 'produto/:productSlug', 
        Component: Produto,
        loader: productLoader,
        errorElement: <NotFound /> 
      },
      { path: 'produtos/:category', Component: Produtos },
      { path: 'comprar-por-tema', Component: ComprarPorTema },
      { path: 'politicas-da-loja', Component: Politicas },
      { path: '*', Component: NotFound },
    ]
  },
  { // Rotas de admin
    hydrateFallbackElement: <Loading />,
    path: 'admin',
    children : [
      { path: 'login', Component: AdminLogin },
      { 
        element: <AdminRootLayout />, 
        children: [
          { index: true, element: <Navigate to="/admin/layout" replace /> },
          { path: 'layout', Component: AdminLayout },
          { path: 'produtos', Component: AdminProdutos },
          { path: 'clientes', Component: AdminClientes },
          { path: 'vendas', Component: AdminVendas },
          { path: 'relatorios', Component: AdminRelatorios },
        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)