import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Candidate } from './candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {

  private readonly STORAGE_KEY = 'evoting_candidates';

  private candidatesSubject = new BehaviorSubject<Candidate[]>(this.loadFromStorage());
  candidates$ = this.candidatesSubject.asObservable();

  constructor() {}

  // Load data from localStorage
  private loadFromStorage(): Candidate[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Candidate[];
    } catch {
      return [];
    }
  }

  // Save & notify UI
  private saveAll(candidates: Candidate[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(candidates));
    this.candidatesSubject.next(candidates);
  }

  // Get current list
  getAllCandidates(): Candidate[] {
    return this.candidatesSubject.value;
  }

  // ADD
  addCandidate(candidate: Candidate) {
    const all = this.getAllCandidates();
    all.push(candidate);
    this.saveAll(all);
  }

  // UPDATE (Edit)
  updateCandidate(updated: Candidate) {
    const all = this.getAllCandidates().map(c =>
      c.id === updated.id ? updated : c
    );
    this.saveAll(all);
  }

  // DELETE
  deleteCandidate(id: string) {
    const all = this.getAllCandidates().filter(c => c.id !== id);
    this.saveAll(all);
  }

  // APPROVE
  approveCandidate(id: string) {
    const all = this.getAllCandidates();
    const c = all.find(c => c.id === id);
    if (c) {
      c.status = 'approved';
      this.saveAll(all);
    }
  }

  // REJECT
  rejectCandidate(id: string) {
    const all = this.getAllCandidates();
    const c = all.find(c => c.id === id);
    if (c) {
      c.status = 'rejected';
      this.saveAll(all);
    }
  }
}