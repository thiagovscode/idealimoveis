import api from './api';
import { Imovel, FiltroImovel, StatusImovel, TipoImovel, CategoriaImovel } from '../types';

export interface OpcoesDisponiveis {
  tipos: TipoImovel[];
  categorias: CategoriaImovel[];
  status: StatusImovel[];
  cidades: string[];
  bairros: string[];
  estados: string[];
  quantidadesQuartos: number[];
  temFinanciamento: boolean;
  temPermuta: boolean;
}

export const imovelService = {
  listar: async (filtros?: FiltroImovel): Promise<Imovel[]> => {
    const params = new URLSearchParams();
    if (filtros) {
      Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    const response = await api.get<Imovel[]>(`/api/imoveis?${params.toString()}`);
    return response.data;
  },

  buscarPorUid: async (uid: string): Promise<Imovel> => {
    const response = await api.get<Imovel>(`/api/imoveis/${uid}`);
    return response.data;
  },

  criar: async (imovel: Imovel): Promise<Imovel> => {
    const response = await api.post<Imovel>('/api/admin/imoveis', imovel);
    return response.data;
  },

  editar: async (uid: string, imovel: Imovel): Promise<Imovel> => {
    const response = await api.put<Imovel>(`/api/admin/imoveis/${uid}`, imovel);
    return response.data;
  },

  deletar: async (uid: string): Promise<void> => {
    await api.delete(`/api/admin/imoveis/${uid}`);
  },

  alterarStatus: async (uid: string, status: StatusImovel): Promise<Imovel> => {
    const response = await api.patch<Imovel>(`/api/admin/imoveis/${uid}/status`, { status });
    return response.data;
  },

  obterOpcoesDisponiveis: async (): Promise<OpcoesDisponiveis> => {
    const response = await api.get<OpcoesDisponiveis>('/api/admin/imoveis/opcoes-disponiveis');
    return response.data;
  }
};
