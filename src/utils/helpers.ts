import { TipoImovel, Caracteristica } from '../types';

export const getTipoImovelLabel = (tipo: TipoImovel): string => {
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
  return labels[tipo] || tipo;
};

export const getCaracteristicaLabel = (car: Caracteristica): string => {
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

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

