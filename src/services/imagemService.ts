import api from './api';

export interface UploadResponse {
  url: string;
  message: string;
}

export const imagemService = {
  /**
   * Upload de uma imagem
   * @param file Arquivo da imagem
   * @param imovelUid UID do imóvel
   * @returns URL da imagem
   */
  upload: async (file: File, imovelUid: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<UploadResponse>(
      `/api/admin/imagens/upload?imovelUid=${imovelUid}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data.url;
  },

  /**
   * Deleta uma imagem
   * @param url URL da imagem
   */
  deletar: async (url: string): Promise<void> => {
    await api.delete('/api/admin/imagens', {
      data: { url }
    });
  }
};

