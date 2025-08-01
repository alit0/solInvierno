import React from 'react';
import { Pencil } from 'lucide-react';

interface EditButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  centered?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({ 
  onClick, 
  label = 'Editar', 
  className = '',
  centered = false 
}) => {
  const baseStyles = "flex items-center justify-center bg-accent-purple hover:bg-accent-purple/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors";
  
  // Si se requiere centrado, añadir estilos para centrar
  const containerStyles = centered ? "flex justify-center my-4" : "";
  
  return (
    <div className={containerStyles}>
      <button
        onClick={onClick}
        className={`${baseStyles} ${className}`}
        type="button"
      >
        <Pencil className="h-4 w-4 mr-2" />
        {label}
      </button>
    </div>
  );
};

export default EditButton;
