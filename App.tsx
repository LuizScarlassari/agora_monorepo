
import React, { useState } from 'react';
import type { Deputy } from './types';
import Header from './components/Header';
import DeputySearchScreen from './components/DeputySearchScreen';
import DeputyVotesScreen from './components/DeputyVotesScreen';

const App: React.FC = () => {
  const [selectedDeputy, setSelectedDeputy] = useState<Deputy | null>(null);

  const handleSelectDeputy = (deputy: Deputy) => {
    setSelectedDeputy(deputy);
  };

  const handleGoBack = () => {
    setSelectedDeputy(null);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        {selectedDeputy ? (
          <DeputyVotesScreen deputy={selectedDeputy} onBack={handleGoBack} />
        ) : (
          <DeputySearchScreen onSelectDeputy={handleSelectDeputy} />
        )}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Fiscalize Meu Voto &copy; 2024. Um projeto de código aberto.</p>
      </footer>
    </div>
  );
};

export default App;
