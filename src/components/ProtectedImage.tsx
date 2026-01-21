import React, { useState } from 'react';

interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
  watermarkText?: string;
}

/**
 * Componente de imagem protegida
 * - Bloqueia clique direito
 * - Bloqueia arrastar
 * - Bloqueia seleção
 * - Adiciona camada invisível sobre a imagem
 */
const ProtectedImage: React.FC<ProtectedImageProps> = ({
  src,
  alt,
  className = '',
  watermarkText = 'Ideal Imóveis'
}) => {
  const [loading, setLoading] = useState(true);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      onContextMenu={handleContextMenu}
    >
      {/* Camada de proteção invisível */}
      <div
        className="absolute inset-0 z-10"
        onDragStart={handleDragStart}
        onMouseDown={(e) => e.preventDefault()}
      />

      {/* Imagem com proteções */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${loading ? 'blur-sm' : ''}`}
        onLoad={() => setLoading(false)}
        onDragStart={handleDragStart}
        onContextMenu={handleContextMenu}
        draggable={false}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      />

      {/* Loading placeholder */}
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default ProtectedImage;

