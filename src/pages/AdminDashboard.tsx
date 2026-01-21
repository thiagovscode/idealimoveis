import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imovelService } from '../services/imovelService';
import { Imovel, StatusImovel, CategoriaImovel } from '../types';

interface EstatisticasAdmin {
  totalDisponiveis: number;
  totalVendidos: number;
  totalAlugados: number;
  valorTotalVendas: number;
  imoveis: Imovel[];
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [estatisticas, setEstatisticas] = useState<EstatisticasAdmin>({
    totalDisponiveis: 0,
    totalVendidos: 0,
    totalAlugados: 0,
    valorTotalVendas: 0,
    imoveis: []
  });

  // Filtros
  const [filtros, setFiltros] = useState({
    periodo: 'todos', // todos, anual, mensal
    ano: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    cidade: '',
    bairro: '',
    status: '' as StatusImovel | ''
  });

  const [cidadesDisponiveis, setCidadesDisponiveis] = useState<string[]>([]);
  const [bairrosDisponiveis, setBairrosDisponiveis] = useState<string[]>([]);

  useEffect(() => {
    carregarDados();
  }, [filtros]);

  const carregarDados = async () => {
    try {
      setLoading(true);

      // Buscar todos os imóveis
      const todosImoveis = await imovelService.listar({});

      // Aplicar filtros
      let imoveisFiltrados = todosImoveis;

      // Filtro de cidade
      if (filtros.cidade) {
        imoveisFiltrados = imoveisFiltrados.filter(
          i => i.endereco.cidade.toLowerCase() === filtros.cidade.toLowerCase()
        );
      }

      // Filtro de bairro
      if (filtros.bairro) {
        imoveisFiltrados = imoveisFiltrados.filter(
          i => i.endereco.bairro.toLowerCase() === filtros.bairro.toLowerCase()
        );
      }

      // Filtro de status
      if (filtros.status) {
        imoveisFiltrados = imoveisFiltrados.filter(i => i.status === filtros.status);
      }

      // Filtro de período (baseado em dataAtualizacao)
      if (filtros.periodo === 'anual') {
        imoveisFiltrados = imoveisFiltrados.filter(i => {
          if (!i.dataAtualizacao) return false;
          const ano = new Date(i.dataAtualizacao).getFullYear();
          return ano === filtros.ano;
        });
      } else if (filtros.periodo === 'mensal') {
        imoveisFiltrados = imoveisFiltrados.filter(i => {
          if (!i.dataAtualizacao) return false;
          const data = new Date(i.dataAtualizacao);
          return data.getFullYear() === filtros.ano &&
                 (data.getMonth() + 1) === filtros.mes;
        });
      }

      // Calcular estatísticas
      const disponiveis = imoveisFiltrados.filter(i => i.status === StatusImovel.DISPONIVEL).length;
      const vendidos = imoveisFiltrados.filter(i => i.status === StatusImovel.VENDIDO).length;
      const alugados = imoveisFiltrados.filter(i => i.status === StatusImovel.ALUGADO).length;

      const valorVendas = imoveisFiltrados
        .filter(i => i.status === StatusImovel.VENDIDO && i.categoria === CategoriaImovel.VENDA)
        .reduce((acc, i) => acc + i.valor, 0);

      setEstatisticas({
        totalDisponiveis: disponiveis,
        totalVendidos: vendidos,
        totalAlugados: alugados,
        valorTotalVendas: valorVendas,
        imoveis: imoveisFiltrados
      });

      // Extrair cidades e bairros únicos
      const cidades = Array.from(new Set(todosImoveis.map(i => i.endereco.cidade))).sort();
      const bairros = Array.from(new Set(todosImoveis.map(i => i.endereco.bairro))).sort();
      setCidadesDisponiveis(cidades);
      setBairrosDisponiveis(bairros);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const limparFiltros = () => {
    setFiltros({
      periodo: 'todos',
      ano: new Date().getFullYear(),
      mes: new Date().getMonth() + 1,
      cidade: '',
      bairro: '',
      status: ''
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4" />
          <p className="text-gray-600">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard - Ideal Imóveis</h1>
        <p className="text-gray-600">Visão geral do seu portfólio</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Período */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
            <select
              value={filtros.periodo}
              onChange={(e) => setFiltros({...filtros, periodo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos</option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          {/* Ano (se período anual ou mensal) */}
          {(filtros.periodo === 'anual' || filtros.periodo === 'mensal') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
              <select
                value={filtros.ano}
                onChange={(e) => setFiltros({...filtros, ano: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[2024, 2025, 2026, 2027].map(ano => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </select>
            </div>
          )}

          {/* Mês (se período mensal) */}
          {filtros.periodo === 'mensal' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mês</label>
              <select
                value={filtros.mes}
                onChange={(e) => setFiltros({...filtros, mes: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Array.from({length: 12}, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i).toLocaleDateString('pt-BR', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Cidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
            <select
              value={filtros.cidade}
              onChange={(e) => setFiltros({...filtros, cidade: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas</option>
              {cidadesDisponiveis.map(cidade => (
                <option key={cidade} value={cidade}>{cidade}</option>
              ))}
            </select>
          </div>

          {/* Bairro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
            <select
              value={filtros.bairro}
              onChange={(e) => setFiltros({...filtros, bairro: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              {bairrosDisponiveis.map(bairro => (
                <option key={bairro} value={bairro}>{bairro}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filtros.status}
              onChange={(e) => setFiltros({...filtros, status: e.target.value as StatusImovel | ''})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value={StatusImovel.DISPONIVEL}>Disponível</option>
              <option value={StatusImovel.VENDIDO}>Vendido</option>
              <option value={StatusImovel.ALUGADO}>Alugado</option>
              <option value={StatusImovel.RESERVADO}>Reservado</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={limparFiltros}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Disponíveis */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Disponíveis</h3>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold">{estatisticas.totalDisponiveis}</p>
          <p className="text-sm mt-2 opacity-90">Imóveis no mercado</p>
        </div>

        {/* Vendidos */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Vendidos</h3>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold">{estatisticas.totalVendidos}</p>
          <p className="text-sm mt-2 opacity-90">Imóveis comercializados</p>
        </div>

        {/* Alugados */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Alugados</h3>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold">{estatisticas.totalAlugados}</p>
          <p className="text-sm mt-2 opacity-90">Imóveis locados</p>
        </div>

        {/* Valor Total de Vendas */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Valor Total</h3>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(estatisticas.valorTotalVendas)}</p>
          <p className="text-sm mt-2 opacity-90">Em vendas realizadas</p>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/admin/imoveis/novo')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Imóvel
          </button>

          <button
            onClick={() => navigate('/admin/imoveis')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Ver Todos
          </button>
        </div>
      </div>

      {/* Lista de Imóveis */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Imóveis ({estatisticas.imoveis.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imóvel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {estatisticas.imoveis.map((imovel) => (
                <tr
                  key={imovel.uid}
                  className={`${
                    imovel.status === StatusImovel.VENDIDO || imovel.status === StatusImovel.ALUGADO
                      ? 'bg-gray-100 opacity-60'
                      : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{imovel.titulo}</div>
                    <div className="text-sm text-gray-500">{imovel.tipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{imovel.endereco.cidade}</div>
                    <div className="text-sm text-gray-500">{imovel.endereco.bairro}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(imovel.valor)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      imovel.status === StatusImovel.DISPONIVEL
                        ? 'bg-green-100 text-green-800'
                        : imovel.status === StatusImovel.VENDIDO
                        ? 'bg-blue-100 text-blue-800'
                        : imovel.status === StatusImovel.ALUGADO
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {imovel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/imoveis/${imovel.uid}/editar`)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => navigate(`/imoveis/${imovel.uid}`)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {estatisticas.imoveis.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum imóvel encontrado com os filtros selecionados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

