import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { imovelService } from '../services/imovelService';
import { Imovel, Caracteristica } from '../types';
import ImageLightbox from '../components/ImageLightbox';

const DetalhesImovel: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [loading, setLoading] = useState(true);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (uid) {
      carregarImovel();
    }
  }, [uid]);

  const carregarImovel = async () => {
    try {
      const data = await imovelService.buscarPorUid(uid!);
      setImovel(data);
    } catch (error) {
      console.error('Erro ao carregar imóvel:', error);
      alert('Imóvel não encontrado');
      navigate('/imoveis');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getCaracteristicaLabel = (car: Caracteristica) => {
    const labels: Record<Caracteristica, string> = {
      PISCINA: 'Piscina',
      CHURRASQUEIRA: 'Churrasqueira',
      ACADEMIA: 'Academia',
      SALAO_FESTAS: 'Salão de Festas',
      ELEVADOR: 'Elevador',
      PORTARIA_24H: 'Portaria 24h',
      PLAYGROUND: 'Playground',
      QUINTAL: 'Quintal',
      AREA_GOURMET: 'Área Gourmet',
      SACADA: 'Sacada',
      SUITE: 'Suíte',
      ARMARIOS_EMBUTIDOS: 'Armários Embutidos'
    };
    return labels[car] || car;
  };

  const getCaracteristicaIcon = (car: Caracteristica) => {
    const icons: Record<Caracteristica, string> = {
      PISCINA: '🏊',
      CHURRASQUEIRA: '🍖',
      ACADEMIA: '💪',
      SALAO_FESTAS: '🎉',
      ELEVADOR: '🛗',
      PORTARIA_24H: '🔐',
      PLAYGROUND: '🎪',
      QUINTAL: '🌳',
      AREA_GOURMET: '🍽️',
      SACADA: '🏖️',
      SUITE: '🛏️',
      ARMARIOS_EMBUTIDOS: '🚪'
    };
    return icons[car] || '✓';
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
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
    return labels[tipo] || tipo;
  };

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      VENDA: 'Venda',
      ALUGUEL: 'Aluguel',
      VENDA_ALUGUEL: 'Venda ou Aluguel'
    };
    return labels[categoria] || categoria;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      DISPONIVEL: 'Disponível',
      VENDIDO: 'Vendido',
      ALUGADO: 'Alugado',
      RESERVADO: 'Reservado'
    };
    return labels[status] || status;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (!imovel) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <p className="text-slate-600 text-lg">Imóvel não encontrado</p>
      </div>
    );
  }

  const imagens = imovel.midias || [];
  const imagemPrincipal = imagens[imagemAtual]?.url || 'https://via.placeholder.com/800x600?text=Sem+Imagem';

  const proximaImagem = () => {
    setImagemAtual((prev) => (prev + 1) % imagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Botão Voltar - Fixo no topo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Voltar</span>
          </button>
        </div>
      </div>

      {/* GALERIA FULL WIDTH - HERO */}
      <div className="relative w-full bg-gray-900">
        {imagens.length > 0 ? (
          <>
            {/* Imagem Principal Hero */}
            <div className="relative w-full h-[60vh] md:h-[70vh] cursor-pointer group">
              <img
                src={imagemPrincipal}
                alt={imovel.titulo}
                onClick={() => setLightboxOpen(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay Gradiente para legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

              {/* Zoom Overlay */}
              <div
                onClick={() => setLightboxOpen(true)}
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
              >
                <div className="bg-white/0 group-hover:bg-white/90 rounded-full p-5 transition-all duration-300 transform scale-0 group-hover:scale-100">
                  <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Navegação de Imagens */}
              {imagens.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      imagemAnterior();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-900 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-2xl z-10"
                    aria-label="Imagem anterior"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      proximaImagem();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-900 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-2xl z-10"
                    aria-label="Próxima imagem"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Contador de Fotos */}
              <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span>{imagemAtual + 1} / {imagens.length}</span>
              </div>

              {/* Badge de Status no Hero */}
              {imovel.status && imovel.status !== 'DISPONIVEL' && (
                <div className="absolute top-6 left-6 bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-base shadow-2xl">
                  {getStatusLabel(imovel.status)}
                </div>
              )}
            </div>

            {/* Miniaturas - Full Width */}
            {imagens.length > 1 && (
              <div className="bg-gray-800 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
                    {imagens.map((midia, index) => (
                      <div
                        key={midia.id}
                        className={`flex-shrink-0 cursor-pointer transition-all duration-200 rounded-lg overflow-hidden ${
                          index === imagemAtual
                            ? 'ring-4 ring-white shadow-2xl scale-105'
                            : 'ring-2 ring-gray-600 hover:ring-white hover:shadow-xl opacity-70 hover:opacity-100'
                        }`}
                        onClick={() => setImagemAtual(index)}
                      >
                        <img
                          src={midia.url}
                          alt={`Foto ${index + 1}`}
                          className="w-32 h-24 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Placeholder Elegante quando não há imagem */
          <div className="relative w-full h-[60vh] md:h-[70vh] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-32 h-32 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">Nenhuma imagem disponível</p>
              <p className="text-gray-400 text-sm mt-2">Este imóvel ainda não possui fotos cadastradas</p>
            </div>
          </div>
        )}
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* COLUNA PRINCIPAL - Informações */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cabeçalho do Imóvel */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                  {getTipoLabel(imovel.tipo)}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  {getCategoriaLabel(imovel.categoria)}
                </span>
                {imovel.status && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    imovel.status === 'DISPONIVEL' ? 'bg-green-100 text-green-800' :
                    imovel.status === 'RESERVADO' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getStatusLabel(imovel.status)}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {imovel.titulo}
              </h1>

              <div className="flex items-start gap-2 text-gray-600 mb-6">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-base">{imovel.endereco.bairro}, {imovel.endereco.cidade} - {imovel.endereco.estado}</span>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wide">Valor do Imóvel</p>
                <p className="text-4xl md:text-5xl font-bold text-gray-900">
                  {formatPrice(imovel.valor)}
                </p>
                {imovel.categoria === 'ALUGUEL' && (
                  <p className="text-sm text-gray-500 mt-1">por mês</p>
                )}
              </div>
            </div>

            {/* Características Principais - Grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Características Principais</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{imovel.quartos}</p>
                  <p className="text-sm text-gray-600 font-medium">Quartos</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{imovel.banheiros}</p>
                  <p className="text-sm text-gray-600 font-medium">Banheiros</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{imovel.vagas}</p>
                  <p className="text-sm text-gray-600 font-medium">Vagas</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{imovel.area}</p>
                  <p className="text-sm text-gray-600 font-medium">m² Total</p>
                </div>
              </div>
            </div>

            {/* Informações Detalhadas */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informações Detalhadas</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Código do Imóvel:</span>
                  <span className="text-gray-900 font-semibold">{imovel.uid?.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Tipo:</span>
                  <span className="text-gray-900 font-semibold">{getTipoLabel(imovel.tipo)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Categoria:</span>
                  <span className="text-gray-900 font-semibold">{getCategoriaLabel(imovel.categoria)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Área Total:</span>
                  <span className="text-gray-900 font-semibold">{imovel.area} m²</span>
                </div>
                {imovel.aceitaFinanciamento && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Financiamento:</span>
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Aceita
                    </span>
                  </div>
                )}
                {imovel.aceitaPermuta && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Permuta:</span>
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Aceita
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Data de Publicação:</span>
                  <span className="text-gray-900 font-semibold">{formatDate(imovel.dataCriacao)}</span>
                </div>
              </div>
            </div>

            {/* Descrição */}
            {imovel.descricao && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Descrição do Imóvel
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                    {imovel.descricao}
                  </p>
                </div>
              </div>
            )}

            {/* Características e Comodidades */}
            {imovel.caracteristicas && imovel.caracteristicas.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Características e Comodidades
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {imovel.caracteristicas.map((car, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors duration-200"
                    >
                      <span className="text-2xl flex-shrink-0">{getCaracteristicaIcon(car)}</span>
                      <span className="text-gray-800 font-medium text-sm">{getCaracteristicaLabel(car)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR - CTA e Contato */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* CTA Principal - Contato */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-2">Interessado?</h3>
                <p className="text-blue-100 mb-6">Entre em contato conosco agora mesmo!</p>

                <div className="space-y-3 mb-6">
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-xs opacity-90">WhatsApp</p>
                      <p className="font-bold">(11) 99999-9999</p>
                    </div>
                  </a>

                  <a
                    href="tel:+5511999999999"
                    className="flex items-center gap-3 p-4 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs opacity-90">Telefone</p>
                      <p className="font-bold">(11) 99999-9999</p>
                    </div>
                  </a>

                  <a
                    href="mailto:contato@imobiliaria.com"
                    className="flex items-center gap-3 p-4 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs opacity-90">E-mail</p>
                      <p className="font-bold text-sm">contato@imobiliaria.com</p>
                    </div>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-blue-100 text-center">
                    Atendimento de segunda a sexta, das 8h às 18h
                  </p>
                </div>
              </div>

              {/* Card de Visita */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Ideal Imóveis</h4>
                    <p className="text-sm text-gray-600">Seu lar ideal</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Há mais de 10 anos realizando sonhos e conectando pessoas aos seus lares ideais.
                </p>
              </div>

              {/* Compartilhar */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-3">Compartilhar este imóvel</h4>
                <div className="flex gap-2">
                  <button className="flex-1 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="flex-1 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                  <button className="flex-1 p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <ImageLightbox
        images={imagens.map(m => m.url)}
        initialIndex={imagemAtual}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageAlt={imovel.titulo}
      />
    </div>
  );
};

export default DetalhesImovel;

