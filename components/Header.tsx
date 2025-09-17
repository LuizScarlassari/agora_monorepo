
import React from 'react';
import { CheckSquare, Scale } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Fiscalize Meu Voto</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
