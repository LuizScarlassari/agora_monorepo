import React from 'react';
import type { Deputy } from '../types';
import { StarIcon } from './Icons';

interface DeputyListItemProps {
  deputy: Deputy;
  onSelect: (deputy: Deputy) => void;
  isFavorite: boolean;
  onToggleFavorite: (deputyId: number) => void;
}

const DeputyListItem: React.FC<DeputyListItemProps> = ({ deputy, onSelect, isFavorite, onToggleFavorite }) => {
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(deputy.id);
  };
  
  return (
    <div
      onClick={() => onSelect(deputy)}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 text-slate-400 hover:text-amber-500 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <StarIcon filled={isFavorite} className={`w-6 h-6 ${isFavorite ? 'text-amber-400' : ''}`} />
      </button>
      <img
        src={deputy.photoUrl}
        alt={deputy.name}
        className="w-24 h-24 rounded-full object-cover mb-4 mt-6 border-4 border-slate-200"
      />
      <h3 className="font-bold text-lg text-slate-900">{deputy.name}</h3>
      <p className="text-slate-600">{deputy.party} - {deputy.state}</p>
    </div>
  );
};

export default DeputyListItem;