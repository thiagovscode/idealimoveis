export enum TipoImovel {
  CASA = 'CASA',
  APARTAMENTO = 'APARTAMENTO',
  TERRENO = 'TERRENO',
  COMERCIAL = 'COMERCIAL',
  INDUSTRIA = 'INDUSTRIA',
  DUPLEX = 'DUPLEX',
  GLEBA = 'GLEBA',
  SOBRADO = 'SOBRADO',
  SALA_COMERCIAL = 'SALA_COMERCIAL'
}

export enum CategoriaImovel {
  VENDA = 'VENDA',
  ALUGUEL = 'ALUGUEL',
  VENDA_ALUGUEL = 'VENDA_ALUGUEL'
}

export enum StatusImovel {
  DISPONIVEL = 'DISPONIVEL',
  VENDIDO = 'VENDIDO',
  ALUGADO = 'ALUGADO',
  RESERVADO = 'RESERVADO'
}

export enum Caracteristica {
  PISCINA = 'PISCINA',
  CHURRASQUEIRA = 'CHURRASQUEIRA',
  ACADEMIA = 'ACADEMIA',
  SALAO_FESTAS = 'SALAO_FESTAS',
  ELEVADOR = 'ELEVADOR',
  PORTARIA_24H = 'PORTARIA_24H',
  PLAYGROUND = 'PLAYGROUND',
  QUINTAL = 'QUINTAL',
  AREA_GOURMET = 'AREA_GOURMET',
  SACADA = 'SACADA',
  SUITE = 'SUITE',
  ARMARIOS_EMBUTIDOS = 'ARMARIOS_EMBUTIDOS'
}

export enum TipoMidia {
  IMAGEM = 'IMAGEM'
}

export interface Endereco {
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Midia {
  id?: number;
  url: string;
  tipo: TipoMidia;
  principal: boolean;
}

export interface Imovel {
  uid?: string;
  titulo: string;
  descricao: string;
  tipo: TipoImovel;
  categoria: CategoriaImovel;
  valor: number;
  status?: StatusImovel;
  endereco: Endereco;
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  caracteristicas: Caracteristica[];
  aceitaFinanciamento: boolean;
  aceitaPermuta: boolean;
  midias?: Midia[];
  dataCriacao?: string;
  dataAtualizacao?: string;
}

export interface FiltroImovel {
  tipo?: TipoImovel;
  categoria?: CategoriaImovel;
  status?: StatusImovel;
  valorMin?: number;
  valorMax?: number;
  cidade?: string;
  estado?: string;
  bairro?: string;
  quartosMin?: number;
  banheirosMin?: number;
  vagasMin?: number;
  areaMin?: number;
  aceitaFinanciamento?: boolean;
  aceitaPermuta?: boolean;
}

export interface Usuario {
  uid: string;
  nome: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
}

