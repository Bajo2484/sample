export type CandidateStatus = 'pending' | 'approved' | 'rejected';

export interface Candidate {
  id: string;

  fullName: string;

  // Position depends on organization
  position: string;

<<<<<<< HEAD
  organization: string;

  partyName: string;   

  platform: string;

  photo?: File | null;

  photoUrl?: string;

  status: CandidateStatus;
}
=======
  // ATLAS, USG, STCM, AEMT
  organization: string;

  // Party / Team (optional text)
  party: string;

  // Optional photo if you add upload later
  photoUrl?: string;

  status: CandidateStatus;
}
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
