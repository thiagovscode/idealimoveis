import React, { useEffect, useState } from 'react';

interface ImageLightboxProps {
  images: string[]; // Array de URLs de imagens
  initialIndex?: number; // Índice inicial
  isOpen: boolean;
  onClose: () => void;
  imageAlt?: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  imageAlt = 'Imagem'
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Atualizar índice quando initialIndex mudar
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm fade-in" onClick={onClose}>
      {/* Botão Fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
        aria-label="Fechar"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navegação - Seta Esquerda */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-200 hover:scale-110 z-10"
          aria-label="Imagem anterior"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Imagem */}
      <div className="max-w-7xl max-h-full p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={currentImage}
          alt={`${imageAlt} ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Navegação - Seta Direita */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-200 hover:scale-110 z-10"
          aria-label="Próxima imagem"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Contador e Instruções */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full flex items-center gap-4">
        {images.length > 1 && (
          <span className="font-bold">
            {currentIndex + 1} / {images.length}
          </span>
        )}
        <span>Pressione ESC ou clique fora para fechar</span>
        {images.length > 1 && (
          <span>← → para navegar</span>
        )}
      </div>
    </div>
  );
};

export default ImageLightbox;

