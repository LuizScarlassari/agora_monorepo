import React, { useState, useEffect } from 'react';
import type { Deputy, Vote } from '../types';
import { getVotesForDeputy } from '../services/camaraApi';
import VoteCard from './VoteCard';
import { ArrowLeft, StarIcon } from './Icons';
import { isDeputyFavorite, addFavoriteDeputy, removeFavoriteDeputy } from '../utils/favorites';

interface DeputyVotesScreenProps {
  deputy: Deputy;
  onBack: () => void;
}

const DeputyVotesScreen: React.FC<DeputyVotesScreenProps> = ({ deputy, onBack }) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loadingVotes, setLoadingVotes] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isDeputyFavorite(deputy.id));
    
    const fetchLegislativeVotes = async () => {
      setLoadingVotes(true);
      try {
        const data = await getVotesForDeputy(deputy.id);
        setVotes(data);
      } catch (error) {
        console.error("Failed to load votes from the API.", error);
      } finally {
        setLoadingVotes(false);
      }
    };
    fetchLegislativeVotes();
  }, [deputy.id]);
  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteDeputy(deputy.id);
    } else {
      addFavoriteDeputy(deputy.id);
    }
    setIsFavorite(!isFavorite);
  };


  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 font-semibold mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar para a busca</span>
      </button>

      <header className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center md:space-x-6">
        <img
          src={deputy.photoUrl}
          alt={deputy.name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-emerald-500 flex-shrink-0"
        />
        <div className="flex-1 mt-4 md:mt-0 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{deputy.name}</h2>
            <button
              onClick={handleToggleFavorite}
              className="p-2 text-slate-400 hover:text-amber-500 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 mt-2 md:mt-0"
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <StarIcon filled={isFavorite} className={`w-8 h-8 ${isFavorite ? 'text-amber-400' : ''}`} />
            </button>
          </div>
          <p className="text-xl text-slate-600">{deputy.party} - {deputy.state}</p>
        </div>
      </header>

      <h3 className="text-2xl font-bold mb-4">Votações Recentes</h3>
      {loadingVotes ? (
        <div className="text-center p-10">
          <p className="text-slate-500">Carregando votações...</p>
        </div>
      ) : votes.length > 0 ? (
        <div className="space-y-6">
          {votes.map(vote => (
            <VoteCard key={vote.voteId} vote={vote} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-slate-500">Nenhuma votação recente encontrada para este deputado nos registros da API.</p>
        </div>
      )}
    </div>
  );
};

export default DeputyVotesScreen;