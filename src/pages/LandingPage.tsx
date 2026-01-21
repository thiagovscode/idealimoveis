import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TipoImovel, StatusImovel, Imovel } from '../types';
import { imovelService, OpcoesDisponiveis } from '../services/imovelService';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [opcoes, setOpcoes] = useState<OpcoesDisponiveis | null>(null);
  const [loading, setLoading] = useState(true);
  const [destaques, setDestaques] = useState<Imovel[]>([]);

  const [busca, setBusca] = useState({
    categoria: '',
    tipo: '',
    status: '',
    bairro: '',
    cidade: '',
    quartosMin: ''
  });

  useEffect(() => {
    carregarOpcoes();
    carregarDestaques();
  }, []);

  const carregarOpcoes = async () => {
    try {
      const dados = await imovelService.obterOpcoesDisponiveis();
      setOpcoes(dados);
    } catch (error) {
      console.error('Erro ao carregar opções:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarDestaques = async () => {
    try {
      const imoveis = await imovelService.listar({ status: StatusImovel.DISPONIVEL });
      // Ordenar por data de criação (mais recentes primeiro)
      const imoveisOrdenados = imoveis.sort((a, b) => {
        const dataA = new Date(a.dataCriacao || 0).getTime();
        const dataB = new Date(b.dataCriacao || 0).getTime();
        return dataB - dataA;
      });
      setDestaques(imoveisOrdenados.slice(0, 6)); // 6 imóveis mais recentes
    } catch (error) {
      console.error('Erro ao carregar destaques:', error);
    }
  };

  const getTipoLabel = (tipo: TipoImovel): string => {
    const labels: Record<TipoImovel, string> = {
      CASA: 'Casa',
      APARTAMENTO: 'Apartamento',
      TERRENO: 'Terreno',
      COMERCIAL: 'Comercial',
      INDUSTRIA: 'Indústria',
      DUPLEX: 'Duplex',
      GLEBA: 'Gleba',
      SOBRADO: 'Sobrado',
      SALA_COMERCIAL: 'Sala Comercial'
    };
    return labels[tipo];
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleBuscar = () => {
    const params = new URLSearchParams();

    if (busca.categoria && busca.categoria !== 'TODOS') params.append('categoria', busca.categoria);
    if (busca.tipo) params.append('tipo', busca.tipo);
    if (busca.status) params.append('status', busca.status);
    if (busca.bairro) params.append('bairro', busca.bairro);
    if (busca.cidade) params.append('cidade', busca.cidade);
    if (busca.quartosMin) params.append('quartosMin', busca.quartosMin);

    navigate(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encontre seu <span className="text-yellow-300">lar ideal</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Os melhores imóveis em Francisco Morato e região
            </p>
          </div>

          {/* Busca Rápida */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    value={busca.categoria}
                    onChange={(e) => setBusca({...busca, categoria: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                  >
                    <option value="TODOS">Venda e Aluguel</option>
                    <option value="VENDA">Venda</option>
                    <option value="ALUGUEL">Aluguel</option>
                  </select>
                </div>

                {/* Tipo do Imóvel */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo do Imóvel
                  </label>
                  <select
                    value={busca.tipo}
                    onChange={(e) => setBusca({...busca, tipo: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    disabled={loading}
                  >
                    <option value="">Todos os tipos</option>
                    {opcoes?.tipos.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {getTipoLabel(tipo)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={busca.status}
                    onChange={(e) => setBusca({...busca, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">Todos</option>
                    <option value="DISPONIVEL">Disponível</option>
                    <option value="RESERVADO">Reservado</option>
                  </select>
                </div>
              </div>

              {/* Filtros Básicos */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {/* Bairro */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={busca.bairro}
                    onChange={(e) => setBusca({...busca, bairro: e.target.value})}
                    placeholder={opcoes?.bairros.length ? "Selecione ou digite" : "Nenhum bairro cadastrado"}
                    list="bairros-list"
                    disabled={loading || !opcoes?.bairros.length}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <datalist id="bairros-list">
                    {opcoes?.bairros.map((bairro) => (
                      <option key={bairro} value={bairro} />
                    ))}
                  </datalist>
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={busca.cidade}
                    onChange={(e) => setBusca({...busca, cidade: e.target.value})}
                    placeholder={opcoes?.cidades.length ? "Selecione ou digite" : "Nenhuma cidade cadastrada"}
                    list="cidades-list"
                    disabled={loading || !opcoes?.cidades.length}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <datalist id="cidades-list">
                    {opcoes?.cidades.map((cidade) => (
                      <option key={cidade} value={cidade} />
                    ))}
                  </datalist>
                </div>

                {/* Quartos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quartos (mínimo)
                  </label>
                  <select
                    value={busca.quartosMin}
                    onChange={(e) => setBusca({...busca, quartosMin: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    disabled={loading}
                  >
                    <option value="">Qualquer</option>
                    {opcoes?.quantidadesQuartos.map((qtd) => (
                      <option key={qtd} value={qtd}>
                        {qtd}+
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              {/* Botão Buscar */}
              <button
                onClick={handleBuscar}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar Imóveis
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Imóveis em Destaque */}
      {destaques.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Imóveis em Destaque
              </h2>
              <p className="text-lg text-gray-600">
                Confira os 6 imóveis mais recentes disponíveis
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {destaques.map((imovel) => (
                <div
                  key={imovel.uid}
                  onClick={() => navigate(`/imoveis/${imovel.uid}`)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  {/* Imagem */}
                  <div className="relative h-48 bg-gray-200">
                    {imovel.midias && imovel.midias.length > 0 ? (
                      <img
                        src={imovel.midias.find(m => m.principal)?.url || imovel.midias[0].url}
                        alt={imovel.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sem imagem
                      </div>
                    )}

                    {/* Badge do Tipo */}
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {getTipoLabel(imovel.tipo)}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {imovel.titulo}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 flex items-center">
                      <span className="mr-1">📍</span>
                      {imovel.endereco.bairro}, {imovel.endereco.cidade}
                    </p>

                    {/* Características */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      {imovel.quartos > 0 && (
                        <span className="flex items-center gap-1">
                          🛏️ {imovel.quartos}
                        </span>
                      )}
                      {imovel.banheiros > 0 && (
                        <span className="flex items-center gap-1">
                          🚿 {imovel.banheiros}
                        </span>
                      )}
                      {imovel.vagas > 0 && (
                        <span className="flex items-center gap-1">
                          🚗 {imovel.vagas}
                        </span>
                      )}
                      {imovel.area > 0 && (
                        <span className="flex items-center gap-1">
                          📐 {imovel.area}m²
                        </span>
                      )}
                    </div>

                    {/* Preço */}
                    <div className="border-t pt-3 mt-3">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(imovel.valor)}
                      </p>
                      {imovel.categoria && (
                        <p className="text-xs text-gray-500 mt-1">
                          {imovel.categoria === 'VENDA' ? 'Venda' :
                           imovel.categoria === 'ALUGUEL' ? 'Aluguel/mês' :
                           'Venda ou Aluguel'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão Ver Todos */}
            <div className="text-center">
              <button
                onClick={() => navigate('/imoveis')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                Ver Todos os Imóveis
                <span>→</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <CTACard
              icon="🏠"
              title="Comprar"
              description="Encontre a casa dos seus sonhos"
              buttonText="Ver Imóveis à Venda"
              onClick={() => navigate('/imoveis?categoria=VENDA')}
              gradient="from-blue-600 to-blue-700"
            />
            <CTACard
              icon="🔑"
              title="Alugar"
              description="O imóvel perfeito para você"
              buttonText="Ver Imóveis para Alugar"
              onClick={() => navigate('/imoveis?categoria=ALUGUEL')}
              gradient="from-indigo-600 to-indigo-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const CTACard: React.FC<{
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  gradient: string;
}> = ({ icon, title, description, buttonText, onClick, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} text-white rounded-2xl p-8 hover:scale-105 transition-transform duration-200 cursor-pointer`} onClick={onClick}>
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-3xl font-bold mb-2">{title}</h3>
    <p className="text-blue-100 mb-6 text-lg">{description}</p>
    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
      {buttonText}
    </button>
  </div>
);

export default LandingPage;

