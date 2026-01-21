import React, { useState, useRef } from 'react';
import { imagemService } from '../services/imagemService';
import ProtectedImage from './ProtectedImage';

interface ImageUploadProps {
  imovelUid: string;
  imagens: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

const MAX_FILE_SIZE = 1048576; // 1MB em bytes

/**
 * Componente de upload de imagens com preview
 * - Upload para Cloudflare R2
 * - Preview das imagens
 * - Deletar imagens
 * - Marca imagem principal
 * - Drag and drop
 * - Limite: 10 imagens, 1MB cada
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  imovelUid,
  imagens,
  onChange,
  maxImages = 10
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Validar número máximo de imagens
    if (imagens.length + files.length > maxImages) {
      setError(`Máximo de ${maxImages} imagens permitidas`);
      return;
    }

    // Validar tamanho de cada arquivo
    const filesArray = Array.from(files);
    const oversizedFiles = filesArray.filter(file => file.size > MAX_FILE_SIZE);

    if (oversizedFiles.length > 0) {
      setError(`Cada imagem deve ter no máximo 1MB. ${oversizedFiles.length} arquivo(s) excede(m) o limite.`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadPromises = filesArray.map(file =>
        imagemService.upload(file, imovelUid)
      );

      const urls = await Promise.all(uploadPromises);
      onChange([...imagens, ...urls]);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao fazer upload');
      console.error('Erro no upload:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url: string, index: number) => {
    if (!window.confirm('Deseja realmente deletar esta imagem?')) return;

    try {
      await imagemService.deletar(url);
      const newImages = imagens.filter((_, i) => i !== index);
      onChange(newImages);
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert('Erro ao deletar imagem');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...imagens];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="text-center">
          {uploading ? (
            <>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4" />
              <p className="text-gray-600">Fazendo upload...</p>
            </>
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-gray-700 font-medium mb-2">
                Clique ou arraste imagens aqui
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG ou WebP até 1MB • Máximo {maxImages} imagens
              </p>
              <p className="text-xs text-blue-600 mt-2">
                ⚡ Marca d'água "Ideal Imóveis" será adicionada automaticamente
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Images Grid */}
      {imagens.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            {imagens.length} de {maxImages} imagens •
            Arraste para reordenar • Primeira imagem é a principal
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagens.map((url, index) => (
              <div
                key={url}
                className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
              >
                {/* Imagem Protegida */}
                <ProtectedImage
                  src={url}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-full"
                />

                {/* Badge Principal */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                    Principal
                  </div>
                )}

                {/* Overlay com ações */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {/* Mover para esquerda */}
                  {index > 0 && (
                    <button
                      onClick={() => moveImage(index, index - 1)}
                      className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 transition-colors"
                      title="Mover para esquerda"
                    >
                      ←
                    </button>
                  )}

                  {/* Deletar */}
                  <button
                    onClick={() => handleDelete(url, index)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    title="Deletar"
                  >
                    🗑️
                  </button>

                  {/* Mover para direita */}
                  {index < imagens.length - 1 && (
                    <button
                      onClick={() => moveImage(index, index + 1)}
                      className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 transition-colors"
                      title="Mover para direita"
                    >
                      →
                    </button>
                  )}
                </div>

                {/* Número da imagem */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Dica:</strong> A primeira imagem será exibida como capa do anúncio.
          Arraste as imagens para reordenar. Cada imagem deve ter no máximo 1MB.
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;

