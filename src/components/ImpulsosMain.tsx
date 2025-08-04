import React, { useState, lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Definimos las interfaces de props para nuestros componentes
interface ImpulsosGridProps {
  onImpulsoClick: (slug: string) => void;
}

interface ImpulsoDetailProps {
  slug: string;
  onBack: () => void;
}

// Usando dynamic imports con React.lazy y cast de tipo para los props
const ImpulsosGrid = lazy(() => import('./ImpulsosGrid')) as React.ComponentType<ImpulsosGridProps>;
const ImpulsoDetail = lazy(() => import('./ImpulsoDetail')) as React.ComponentType<ImpulsoDetailProps>;

// Componente de carga para usar con Suspense
const LoadingComponent = () => (
  <div className="flex justify-center items-center py-20">
    <Loader2 className="w-8 h-8 animate-spin text-sage-green" />
  </div>
);

const ImpulsosMain: React.FC = () => {
  const [currentView, setCurrentView] = useState<'grid' | 'detail'>('grid');
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  // Simular routing - en una app real usarías React Router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('impulso/')) {
        const slug = hash.replace('impulso/', '');
        setSelectedSlug(slug);
        setCurrentView('detail');
      } else {
        setCurrentView('grid');
        setSelectedSlug('');
      }
    };

    // Verificar hash inicial
    handleHashChange();

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleImpulsoClick = (slug: string) => {
    window.location.hash = `impulso/${slug}`;
    setSelectedSlug(slug);
    setCurrentView('detail');
  };

  const handleBackToGrid = () => {
    window.location.hash = '';
    setCurrentView('grid');
    setSelectedSlug('');
  };

  if (currentView === 'detail' && selectedSlug) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <ImpulsoDetail slug={selectedSlug} onBack={handleBackToGrid} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingComponent />}>
      <ImpulsosGrid onImpulsoClick={handleImpulsoClick} />
    </Suspense>
  );
};

export default ImpulsosMain;