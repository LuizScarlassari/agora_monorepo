export interface Deputy {
  id: number;
  name: string;
  party: string;
  state: string;
  photoUrl: string;
  lastElectionVotes?: number;
}

export enum VoteType {
  Sim = 'Sim',
  Nao = 'Não',
  Abstencao = 'Abstenção',
  Ausente = 'Ausente',
  Obstrucao = 'Obstrução', // Added for more accuracy
}

export enum VoteImportance {
    High = 'Alta',
    Medium = 'Média',
    Low = 'Baixa',
}

export interface Vote {
  voteId: string;
  deputyId: number;
  propositionId: string;
  propositionTitle: string;
  propositionSummary: string;
  voteDate: string;
  voteType: VoteType;
  importance: VoteImportance;
}

export enum UserFeedback {
    Approve = 'Approve',
    Disapprove = 'Disapprove',
}