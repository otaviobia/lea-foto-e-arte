import { useState } from 'react';
import { Outlet, NavLink, Link, Navigate, useNavigate } from 'react-router';
import { FiMenu, FiX, FiHome, FiBox, FiShoppingCart, FiFileText, FiLogOut } from 'react-icons/fi';

export default function AdminRootLayout() {
  // 1. VERIFICAÇÃO DE SEGURANÇA
  const token = localStorage.getItem('admin_token');
  const navigate = useNavigate();

  // Se não tiver token, barra a renderização do layout e manda pro login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // 2. FUNÇÃO DE LOGOUT
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('admin_token'); // Apaga o token do localStorage
    navigate('/admin/login'); // Manda de volta pro login
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors ${
      isActive 
        ? 'bg-lfapink/50 text-black font-semibold' 
        : 'text-gray-600 hover:bg-gray-200'      
    }`;

  return (
    <div className="flex h-screen w-full bg-gray-200 font-viminalis overflow-hidden">
      
      {/* SIDEBAR */}
      <aside 
        className={`bg-[#FAFAFA] border-r border-gray-300 flex flex-col justify-between transition-all duration-300 ease-in-out whitespace-nowrap ${
          isSidebarOpen ? 'w-64' : 'w-0 opacity-0 md:opacity-100 md:w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col gap-4 py-4 w-64"> 
          <div className="flex justify-between items-center px-4">
            <Link to="/" className="text-xl text-gray-700 uppercase">Léa Foto e Arte</Link>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-800">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            <NavLink to="/admin/layout" className={navLinkStyle}>
              <FiHome /> Layout Principal
            </NavLink>
            <NavLink to="/admin/produtos" className={navLinkStyle}>
              <FiBox /> Produtos
            </NavLink>
            <NavLink to="/admin/vendas" className={navLinkStyle}>
              <FiShoppingCart /> Vendas
            </NavLink>
            <NavLink to="/admin/relatorios" className={navLinkStyle}>
              <FiFileText /> Relatórios
            </NavLink>
          </nav>
        </div>

        {/* Botão Sair */}
        <div className="p-4 w-64 border-t border-gray-200">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <FiLogOut /> Sair
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-[#FAFAFA] border-b border-gray-300 h-12 min-h-12 flex items-center px-4 gap-3 text-gray-600">
          {!isSidebarOpen && (
            <button onClick={toggleSidebar} className="hover:text-black transition-colors">
              <FiMenu className="w-5 h-5" />
            </button>
          )}
          <span className="text-sm font-semibold">Backoffice</span>
        </header>

        {/* CONTEÚDO DA PÁGINA */}
        <main className="flex-1 overflow-auto bg-[#EBEBEB]">
          <Outlet />
        </main>
      </div>

    </div>
  );
}