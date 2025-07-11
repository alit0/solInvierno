import React, { useState } from 'react';
import { useEffect } from 'react';
import ImpulsosGrid from './ImpulsosGrid';
import ImpulsoDetail from './ImpulsoDetail';

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
    return <ImpulsoDetail slug={selectedSlug} onBack={handleBackToGrid} />;
  }

  return <ImpulsosGrid onImpulsoClick={handleImpulsoClick} />;
};

export default ImpulsosMain;