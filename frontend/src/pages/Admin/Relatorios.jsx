import { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaDollarSign,
  FaCoins,
  FaShoppingBag,
  FaPercentage,
} from 'react-icons/fa';

function AdminRelatorios() {
  // Define o primeiro e o último dia do mês atual como padrão inicial dos filtros
  const hoje = new Date();
  const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    .toISOString()
    .split('T')[0];
  const ultimoDiaMes = hoje.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(primeiroDiaMes);
  const [endDate, setEndDate] = useState(ultimoDiaMes);

  const [dados, setDados] = useState({
    resumo: { totalVendas: 0, faturamento: 0, gastos: 0, lucro: 0 },
    canais: {},
  });
  const [loading, setLoading] = useState(true);

  const carregarRelatorio = async (inicio, fim) => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(
        `http://localhost:3000/api/relatorios/financeiro?startDate=${inicio}&endDate=${fim}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDados(data);
      }
    } catch (err) {
      console.error('Erro ao buscar relatório:', err);
    }
  };

  // Carrega automaticamente ao abrir a página com as datas padrão do mês
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarRelatorio(primeiroDiaMes, ultimoDiaMes).finally(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltrarClick = () => {
    setLoading(true); // No clique do botão, setState síncrono é permitido
    carregarRelatorio(startDate, endDate).finally(() => {
      setLoading(false);
    });
  };

  const formatarMoeda = valor => Number(valor).toFixed(2).replace('.', ',');

  return (
    <main className="font-viminalis bg-gray-200 min-h-screen flex flex-col p-4 gap-6 pb-12">
      <h1 className="text-4xl">Relatórios</h1>

      {/* --- SEÇÃO DE FILTROS TEMPORAIS --- */}
      <div className="bg-white p-4 rounded-xl flex flex-wrap items-end gap-4 shadow-sm w-fit">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            <FaCalendarAlt className="text-lfapink" /> Data Inicial
          </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded-lg p-2 outline-none focus:border-lfapink bg-gray-50 text-gray-700 font-semibold cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            <FaCalendarAlt className="text-lfapink" /> Data Final
          </label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded-lg p-2 outline-none focus:border-lfapink bg-gray-50 text-gray-700 font-semibold cursor-pointer"
          />
        </div>

        <button
          onClick={handleFiltrarClick}
          disabled={loading}
          className="bg-lfapink text-white px-6 py-2 rounded-lg font-semibold hover:brightness-95 transition-all cursor-pointer disabled:opacity-50 h-10.5"
        >
          {loading ? 'Filtrando...' : 'Filtrar Período'}
        </button>
      </div>

      {/* --- CARDS DOS PRINCIPAIS KPIS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card Faturamento */}
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between border-l-4 border-blue-500">
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">
              Faturamento Bruto
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              R$ {formatarMoeda(dados.resumo.faturamento)}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600 text-xl">
            <FaDollarSign />
          </div>
        </div>

        {/* Card Gastos / Taxas */}
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between border-l-4 border-red-500">
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">
              Custos e Taxas
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              R$ {formatarMoeda(dados.resumo.gastos)}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-xl text-red-600 text-xl">
            <FaCoins />
          </div>
        </div>

        {/* Card Lucro Líquido (Dinâmico conforme o saldo) */}
        <div
          className={`bg-white p-5 rounded-xl shadow-sm flex items-center justify-between border-l-4 ${dados.resumo.lucro >= 0 ? 'border-green-500' : 'border-red-600'}`}
        >
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">
              Lucro Líquido
            </p>
            <p
              className={`text-2xl font-bold mt-1 ${dados.resumo.lucro >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              R$ {formatarMoeda(dados.resumo.lucro)}
            </p>
          </div>
          <div
            className={`p-3 rounded-xl text-xl ${dados.resumo.lucro >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
          >
            <FaPercentage />
          </div>
        </div>

        {/* Card Total de Vendas */}
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between border-l-4 border-lfapink">
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">
              Volume de Pedidos
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {dados.resumo.totalVendas} vendas
            </p>
          </div>
          <div className="bg-pink-100 p-3 rounded-xl text-lfapink text-xl">
            <FaShoppingBag />
          </div>
        </div>
      </div>

      {/* --- DETALHAMENTO POR CANAL DE VENDA --- */}
      <div className="bg-white rounded-xl p-5 shadow-sm max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Desempenho por Canal de Venda
        </h2>
        {Object.keys(dados.canais).length === 0 ? (
          <p className="text-gray-500 italic">
            Nenhuma venda registrada neste intervalo de tempo.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {Object.entries(dados.canais).map(([canal, info]) => (
              <div
                key={canal}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <div>
                  <p className="font-bold uppercase text-gray-700 text-sm">
                    {canal}
                  </p>
                  <p className="text-xs text-gray-500">
                    {info.quantidade}{' '}
                    {info.quantidade === 1
                      ? 'pedido realizado'
                      : 'pedidos realizados'}
                  </p>
                </div>
                <p className="font-bold text-gray-800">
                  R$ {formatarMoeda(info.faturamento)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminRelatorios;
