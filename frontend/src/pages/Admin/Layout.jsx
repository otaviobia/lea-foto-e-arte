import { FaImage, FaStar } from "react-icons/fa";

function AdminLayout() {
  return (
    <main className="font-viminalis bg-gray-200 h-screen flex flex-col p-4 gap-2">
      <h1 className="text-4xl">Layout da Página Inicial</h1>
      <div className="bg-white rounded-xl flex flex-col p-2 min-w-80 lg:min-w-100">
        <p className="flex items-center gap-0.5 text-xl"><FaImage className="text-lfapink w-8" />Carrosel de Banners</p>
      </div>
      <div className="bg-white rounded-xl flex flex-col p-2 min-w-80 lg:min-w-100">
        <p className="flex items-center gap-0.5 text-xl"><FaStar className="text-lfapink w-8" />Categorias em Destaque</p>
      </div>
    </main>
  )
}

export default AdminLayout