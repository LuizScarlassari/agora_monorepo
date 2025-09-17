import type { Deputy, Vote } from '../types';
import { VoteType, VoteImportance } from '../types';

// Type for the raw deputy data from the API
interface CamaraApiDeputy {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
}

// Type for the API response envelope for deputies
interface CamaraApiDeputiesResponse {
  dados: CamaraApiDeputy[];
  links: { rel: string; href: string }[];
}

// Type for a single voting session from the API list
interface CamaraApiVotacao {
    id: string;
    uri: string;
    data: string;
    descricao: string;
    uriProposicaoObjetoPrincipal: string | null;
}

// Type for the API response for voting sessions
interface CamaraApiVotacoesResponse {
    dados: CamaraApiVotacao[];
}

// Type for a single vote by a deputy in a session
interface CamaraApiVoto {
    deputado_: {
        id: number;
    };
    tipoVoto: string;
}

// Type for the API response for individual votes in a session
interface CamaraApiVotosResponse {
    dados: CamaraApiVoto[];
}


// Helper to find the 'next' page URL from the links array
const findNextPageUrl = (links: { rel: string; href: string }[]): string | null => {
  const nextLink = links.find(link => link.rel === 'next');
  return nextLink ? nextLink.href : null;
};

// Main function to fetch all deputies, handling pagination
export const getAllDeputies = async (): Promise<Deputy[]> => {
  let allDeputies: Deputy[] = [];
  let nextUrl: string | null = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&itens=100';

  while (nextUrl) {
    try {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }
      const data: CamaraApiDeputiesResponse = await response.json();

      const mappedDeputies = data.dados.map((apiDeputy: CamaraApiDeputy): Deputy => ({
        id: apiDeputy.id,
        name: apiDeputy.nome,
        party: apiDeputy.siglaPartido,
        state: apiDeputy.siglaUf,
        photoUrl: apiDeputy.urlFoto.replace('http://', 'https://'),
        // lastElectionVotes is removed from here and fetched on the details screen
      }));

      allDeputies = [...allDeputies, ...mappedDeputies];
      nextUrl = findNextPageUrl(data.links);
    } catch (error) {
      console.error("Failed to fetch deputies:", error);
      nextUrl = null;
    }
  }

  return allDeputies;
};

// Maps API vote strings to our VoteType enum
const mapVoteType = (apiVote: string): VoteType => {
    switch (apiVote.trim()) {
        case 'Sim': return VoteType.Sim;
        case 'Não': return VoteType.Nao;
        case 'Abstenção': return VoteType.Abstencao;
        case 'Obstrução': return VoteType.Obstrucao;
        default: return VoteType.Ausente;
    }
};

// Determines the importance of a vote based on keywords in its description
const getVoteImportance = (description: string): VoteImportance => {
    const upperDesc = description.toUpperCase();
    if (upperDesc.includes('PROPOSTA DE EMENDA À CONSTITUIÇÃO') || upperDesc.includes('PEC ')) {
        return VoteImportance.High;
    }
    if (upperDesc.includes('MEDIDA PROVISÓRIA') || upperDesc.includes('MPV ') || upperDesc.includes('PROJETO DE LEI COMPLEMENTAR') || upperDesc.includes('PLP ')) {
        return VoteImportance.Medium;
    }
    return VoteImportance.Low;
};


// Fetches recent votes for a specific deputy
export const getVotesForDeputy = async (deputyId: number): Promise<Vote[]> => {
    try {
        const votacoesResponse = await fetch('https://dadosabertos.camara.leg.br/api/v2/votacoes?ordem=DESC&ordenarPor=dataHoraRegistro&itens=20');
        if (!votacoesResponse.ok) throw new Error(`Failed to fetch recent votations list: ${votacoesResponse.status}`);
        const votacoesData: CamaraApiVotacoesResponse = await votacoesResponse.json();
        
        const deputyVotes: Vote[] = [];

        for (const votacao of votacoesData.dados) {
            // Defensive check: ensure the URI exists before trying to fetch
            if (!votacao || !votacao.uri) {
                console.warn(`Skipping a voting session because it has invalid data:`, votacao);
                continue;
            }

            try {
                const votesUri = `${votacao.uri.replace('http://', 'https://')}/votos`;
                const votesResponse = await fetch(votesUri);

                if (votesResponse.ok) {
                    const votesForSession: CamaraApiVotosResponse = await votesResponse.json();
                    const deputyVote = votesForSession.dados.find(v => v.deputado_.id === deputyId);

                    if (deputyVote) {
                        deputyVotes.push({
                            voteId: `${votacao.id}-${deputyId}`,
                            deputyId: deputyId,
                            propositionId: votacao.uriProposicaoObjetoPrincipal || votacao.id,
                            propositionTitle: votacao.descricao,
                            propositionSummary: `Votação referente a: ${votacao.descricao}`,
                            voteDate: votacao.data,
                            voteType: mapVoteType(deputyVote.tipoVoto),
                            importance: getVoteImportance(votacao.descricao),
                        });
                    }
                } else {
                     console.warn(`Failed to fetch votes for session ${votacao.id}, status: ${votesResponse.status}`);
                }
            } catch (innerError) {
                console.warn(`Error processing individual votes for session ${votacao.id}:`, innerError);
            }
            
            // Add a small delay between requests to avoid overwhelming the API and triggering rate limits.
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        return deputyVotes;

    } catch (error) {
        console.error("Failed to fetch votes for deputy:", error);
        return [];
    }
};