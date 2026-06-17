import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useState, useEffect } from "react";

function ProdutosLogin() {
  const [produtos, setprodutos] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/produtos/`)
      .then(res => res.json())
      .then(data => setprodutos(data.produtos))
      .catch(console.error);
  }, []);

  return (
    <main className="font-viminalis bg-gray-200 h-screen flex flex-col p-4 gap-2">
      <h1 className="text-4xl">Produtos</h1>
      <button className="flex justify-center items-center gap-2 bg-lfapink p-2 rounded-xl mt-2 text-white w-fit px-4 cursor-pointer hover:brightness-90"><FaPlus/>Novo Produto</button>
      {produtos.map((produto, id) => (
        <div key={id} className="bg-white rounded-xl flex flex-col p-2 min-w-80 lg:min-w-100">
          <p>{produto.title}</p>
          <div className="flex gap-2">
            <p className="text-gray-500">R$ {produto.price.toString().replace('.', ',')}</p>
            <a className="text-lfapink brightness-90 flex items-center" href={produto.shopeeLink}>Shopee<FiExternalLink /></a>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center cursor-pointer"><FaPencilAlt /></button>
            <button className="text-lfapink brightness-90 flex items-center cursor-pointer"><FaTrash /></button>
          </div>
        </div>
      ))}
    </main>
  )
}

export default ProdutosLogin