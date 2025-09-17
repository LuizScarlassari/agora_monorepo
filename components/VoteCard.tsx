import React, { useState } from 'react';
import type { Vote } from '../types';
import { UserFeedback, VoteType, VoteImportance } from '../types';
import { ThumbsUp, ThumbsDown, CheckCircle, XCircle, MinusCircle, QuestionMarkCircle, StopCircle } from './Icons';

interface VoteCardProps {
  vote: Vote;
}

const ImportanceBadge: React.FC<{ importance: VoteImportance }> = ({ importance }) => {
    const styles = {
        [VoteImportance.High]: 'bg-red-100 text-red-800 border-red-300',
        [VoteImportance.Medium]: 'bg-amber-100 text-amber-800 border-amber-300',
        [VoteImportance.Low]: 'bg-sky-100 text-sky-800 border-sky-300',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${styles[importance]}`}>
            Importância: {importance}
        </span>
    );
}

const VoteIndicator: React.FC<{ voteType: VoteType }> = ({ voteType }) => {
  const styles = {
    [VoteType.Sim]: 'bg-green-100 text-green-800',
    [VoteType.Nao]: 'bg-red-100 text-red-800',
    [VoteType.Abstencao]: 'bg-yellow-100 text-yellow-800',
    [VoteType.Obstrucao]: 'bg-orange-100 text-orange-800',
    [VoteType.Ausente]: 'bg-slate-100 text-slate-800',
  };

  const icons = {
    [VoteType.Sim]: <CheckCircle className="w-5 h-5 mr-2" />,
    [VoteType.Nao]: <XCircle className="w-5 h-5 mr-2" />,
    [VoteType.Abstencao]: <MinusCircle className="w-5 h-5 mr-2" />,
    [VoteType.Obstrucao]: <StopCircle className="w-5 h-5 mr-2" />,
    [VoteType.Ausente]: <QuestionMarkCircle className="w-5 h-5 mr-2" />,
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${styles[voteType]}`}>
      {icons[voteType]}
      Voto: {voteType}
    </div>
  );
};

const VoteCard: React.FC<VoteCardProps> = ({ vote }) => {
  const [feedback, setFeedback] = useState<UserFeedback | null>(null);
  const [showFullSummary, setShowFullSummary] = useState(false);

  const handleFeedback = (newFeedback: UserFeedback) => {
    setFeedback(current => (current === newFeedback ? null : newFeedback));
  };
  
  const summary = vote.propositionTitle; // Using title as summary as per API response
  const isTruncated = summary.length > 150;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold text-slate-900 flex-1 pr-4">{vote.propositionTitle}</h4>
          <span className="text-sm text-slate-500 whitespace-nowrap">{new Date(vote.voteDate).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="mb-4">
            <ImportanceBadge importance={vote.importance} />
        </div>
        <p className="text-slate-600 mb-4">
          {isTruncated && !showFullSummary ? `${summary.substring(0, 150)}...` : summary}
          {isTruncated && (
            <button
              onClick={() => setShowFullSummary(!showFullSummary)}
              className="text-emerald-600 hover:text-emerald-800 font-semibold ml-2"
            >
              {showFullSummary ? 'Ver menos' : 'Ver mais'}
            </button>
          )}
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <VoteIndicator voteType={vote.voteType} />
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <span className="text-sm font-medium text-slate-600 mr-2">Sua opinião:</span>
                <button
                    onClick={() => handleFeedback(UserFeedback.Approve)}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                        feedback === UserFeedback.Approve ? 'bg-green-100 text-green-600' : 'text-slate-400 hover:bg-green-50 hover:text-green-500'
                    }`}
                    aria-label="Aprovar"
                >
                    <ThumbsUp className="w-6 h-6" />
                </button>
                <button
                    onClick={() => handleFeedback(UserFeedback.Disapprove)}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                        feedback === UserFeedback.Disapprove ? 'bg-red-100 text-red-600' : 'text-slate-400 hover:bg-red-50 hover:text-red-500'
                    }`}
                    aria-label="Desaprovar"
                >
                    <ThumbsDown className="w-6 h-6" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;