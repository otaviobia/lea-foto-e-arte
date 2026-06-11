import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import './index.css'

import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import NotFound from './pages/NotFound.jsx'
import Politicas from './pages/Politicas.jsx'

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'sobre', Component: Sobre },
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