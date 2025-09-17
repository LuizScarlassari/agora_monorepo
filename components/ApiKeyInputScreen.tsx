import React, { useState } from 'react';

interface ApiKeyInputScreenProps {
  onKeySubmit: (apiKey: string) => void;
}

const ApiKeyInputScreen: React.FC<ApiKeyInputScreenProps> = ({ onKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-4">Chave de API Necessária</h2>
      <p className="text-slate-600 mb-6">
        Para buscar o número de votos da última eleição, este aplicativo utiliza a API do Google Gemini.
        Por favor, insira sua chave de API para continuar. A chave será salva apenas no seu navegador.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Cole sua chave de API do Google Gemini aqui"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow mb-4"
          aria-label="Chave de API do Google Gemini"
        />
        <button
          type="submit"
          disabled={!apiKey.trim()}
          className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Salvar e Continuar
        </button>
      </form>
      
      <p className="mt-6 text-sm text-slate-500">
        Não tem uma chave? Você pode obter uma gratuitamente no{' '}
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline font-semibold"
        >
          Google AI Studio
        </a>.
      </p>
    </div>
  );
};

export default ApiKeyInputScreen;
