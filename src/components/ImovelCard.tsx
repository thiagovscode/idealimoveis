import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Imovel, TipoImovel, StatusImovel } from '../types';

interface ImovelCardProps {
  imovel: Imovel;
}

const ImovelCard: React.FC<ImovelCardProps> = ({ imovel }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getTipoLabel = (tipo: TipoImovel) => {
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

  const imagemPrincipal = imovel.midias?.find(m => m.principal)?.url ||
                          'https://via.placeholder.com/400x300?text=Sem+Imagem';

  // Verificar se está vendido/alugado
  const isVendido = imovel.status === StatusImovel.VENDIDO || imovel.status === StatusImovel.ALUGADO;

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
        isVendido ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'
      }`}
      onClick={() => !isVendido && navigate(`/imoveis/${imovel.uid}`)}
    >
      {/* Layout Horizontal Responsivo */}
      <div className="flex flex-col md:flex-row">
        {/* Container de Imagem - aspect-video para evitar cortes */}
        <div className="relative w-full md:w-2/5 aspect-video md:aspect-square overflow-hidden">
          <img
            src={imagemPrincipal}
            alt={imovel.titulo}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              !isVendido && 'group-hover:scale-110'
            } ${isVendido && 'grayscale-[30%]'}`}
          />

          {/* Badge de Tipo - Overlay na imagem */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold rounded-full shadow-lg">
              {getTipoLabel(imovel.tipo)}
            </span>
          </div>

          {/* Badge de Status Vendido/Alugado */}
          {isVendido && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
              {imovel.status === StatusImovel.VENDIDO ? '✓ VENDIDO' : '✓ ALUGADO'}
            </div>
          )}
        </div>

        {/* Conteúdo - Informações */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {imovel.titulo}
            </h3>

            <p className="text-slate-600 text-sm mb-4 flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {imovel.endereco.bairro}, {imovel.endereco.cidade} - {imovel.endereco.estado}
            </p>

            {/* Badges de Características - Visual Premium */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">{imovel.quartos} Quartos</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">{imovel.banheiros} Banheiros</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">{imovel.vagas} Vagas</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="text-sm font-bold text-blue-700">{imovel.area}m²</span>
              </div>
            </div>
          </div>

          {/* Preço e Ação */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-500 mb-1">Valor</p>
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {formatPrice(imovel.valor)}
              </p>
            </div>

            {!isVendido && (
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg">
                Ver Detalhes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImovelCard;

