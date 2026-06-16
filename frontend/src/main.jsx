import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
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

const router = createBrowserRouter([
  {
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
      { path: 'produtos', Component: Produtos },
      {
        path: 'comprar-por-tema', Component: ComprarPorTema,
      },
      { path: 'politicas-da-loja', Component: Politicas },
      { path: '*', Component: NotFound },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)