import { useState } from "react";
import { FaBars } from "react-icons/fa";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
  <>
    <header className="bg-white sticky z-20 top-0 w-full flex items-center justify-between border-b border-lfapink box-border md:px-15 md:py-5">
    
    <div className="pl-5 cursor-pointer md:hidden text-lfapink" onClick={toggleSidebar}>
      <FaBars className="w-12 h-12" />
    </div>

    <a href="/" className="w-28.5 absolute left-1/2 -translate-x-1/2 block md:static md:translate-x-0">
      <img src="/images/logo.png" alt="Léa Foto e Arte" className="w-full block" />
    </a>

    <img className="h-22.5 md:hidden" src="/images/header-decoration.png" alt="Decoração" />

    <nav className="hidden md:flex gap-5">
      <a href="/" className="text-black font-viminalis text-[1.2em] no-underline hover:text-lfapink transition-colors">Início</a>
      <a href="/comprar-por-tema" className="text-black font-viminalis text-[1.2em] no-underline hover:text-lfapink transition-colors">Comprar por Tema</a>
      <a href="/sobre" className="text-black font-viminalis text-[1.2em] no-underline hover:text-lfapink transition-colors">Sobre</a>
    </nav>
    </header>

    {isSidebarOpen && (
    <div 
      className="fixed inset-0 bg-black/40 z-30 transition-opacity" 
      onClick={toggleSidebar}
    />
    )}

    <aside 
    className={`fixed top-0 left-0 h-full w-70 bg-white z-40 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
    >
    <div className="flex justify-end p-4">
      <button onClick={toggleSidebar} className="text-gray-500 hover:text-black">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
      </button>
    </div>

    {/* BUSCA NÃO IMPLEMENTADA AINDA
    <div className="relative px-4 pb-4">
      <input 
      type="text" 
      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full focus:ring-lfapink focus:border-lfapink block pl-4 p-2.5 outline-none" 
      placeholder="Buscar..." 
      />
      <svg className="absolute right-7 top-1/2 -translate-y-[calc(50%+8px)] text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>*/}

    <nav className="flex flex-col px-6 py-4 gap-4 grow">
      <a href="/" className="text-black font-viminalis text-lg pb-2 border-b border-gray-200 hover:text-lfapink">Início</a>
      <a href="/comprar-por-tema" className="text-black pb-2 border-b border-gray-200 font-viminalis text-lg hover:text-lfapink">Comprar por Tema</a>
      <a href="/sobre" className="text-black font-viminalis pb-2 border-b border-gray-200 text-lg hover:text-lfapink">Sobre</a>
    </nav>

    <div className="mt-auto p-6 flex justify-center">
      <img src="/images/submarca.png" alt="Léa Foto e Arte Logo" className="w-32 h-auto" />
    </div>
    </aside>
  </>
  )
}

export default Header