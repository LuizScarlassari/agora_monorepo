import React, { useState, useEffect, useMemo } from 'react';
import type { Deputy } from '../types';
import { getAllDeputies } from '../services/camaraApi';
import DeputyListItem from './DeputyListItem';
import { SearchIcon } from './Icons';
import { getFavoriteDeputies, addFavoriteDeputy, removeFavoriteDeputy } from '../utils/favorites';
import SeatDistributionChart from './SeatDistributionChart';

interface DeputySearchScreenProps {
  onSelectDeputy: (deputy: Deputy) => void;
}

const DeputySearchScreen: React.FC<DeputySearchScreenProps> = ({ onSelectDeputy }) => {
  const [deputies, setDeputies] = useState<Deputy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteDeputies());

    const fetchDeputies = async () => {
      setLoading(true);
      try {
        const data = await getAllDeputies();
        setDeputies(data);
      } catch (error) {
          console.error("Failed to load deputies from the API.", error);
          // Optionally, set an error state here to show a message to the user
      } finally {
        setLoading(false);
      }
    };
    fetchDeputies();
  }, []);

  const handleToggleFavorite = (deputyId: number) => {
    const isFavorite = favorites.includes(deputyId);
    if (isFavorite) {
      removeFavoriteDeputy(deputyId);
    } else {
      addFavoriteDeputy(deputyId);
    }
    setFavorites(getFavoriteDeputies());
  };

  const sortedAndFilteredDeputies = useMemo(() => {
    return deputies
      .filter(deputy =>
        deputy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deputy.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deputy.state.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aIsFavorite = favorites.includes(a.id);
        const bIsFavorite = favorites.includes(b.id);
        if (aIsFavorite && !bIsFavorite) return -1;
        if (!aIsFavorite && bIsFavorite) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [deputies, searchTerm, favorites]);


  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Acompanhe seu Deputado Federal</h2>
      <p className="text-slate-600 mb-6 text-center">Pesquise pelo nome, partido ou estado para ver o histórico de votações.</p>
      
      {loading ? (
        <div className="text-center p-10">
          <p className="text-slate-500">Carregando dados...</p>
        </div>
      ) : (
        <>
          <SeatDistributionChart deputies={deputies} />
          <div className="mb-8 mt-8">
            <div className="border-b border-slate-300">
              <h3 className="text-lg font-semibold text-emerald-700 border-b-2 border-emerald-700 inline-block pb-2">
                Câmara dos Deputados ({deputies.length} assentos)
              </h3>
            </div>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar deputado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedAndFilteredDeputies.map(deputy => (
              <DeputyListItem
                key={deputy.id}
                deputy={deputy}
                onSelect={onSelectDeputy}
                isFavorite={favorites.includes(deputy.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DeputySearchScreen;
