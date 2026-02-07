export type CandidateStatus = 'pending' | 'approved' | 'rejected';

export interface Candidate {
  id: string;

  fullName: string;

  // Position depends on organization
  position: string;

  // ATLAS, USG, STCM, AEMT
  organization: string;

  // Party / Team (optional text)
  party: string;

  // Optional photo if you add upload later
  photoUrl?: string;

  status: CandidateStatus;
}