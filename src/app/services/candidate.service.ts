import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Candidate } from './candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
<<<<<<< HEAD
 
  async uploadPhoto(file: File, _fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Unexpected result from FileReader'));
        }
      };
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }
=======
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a

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

<<<<<<< HEAD
  
=======
  // Get current list
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  getAllCandidates(): Candidate[] {
    return this.candidatesSubject.value;
  }

<<<<<<< HEAD
  loadCandidates(): void {
    const all = this.loadFromStorage();
    this.candidatesSubject.next(all);
  }


=======
  // ADD
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  addCandidate(candidate: Candidate) {
    const all = this.getAllCandidates();
    all.push(candidate);
    this.saveAll(all);
  }

<<<<<<< HEAD
  
  updateCandidate(id: string, updated: Candidate) {
=======
  // UPDATE (Edit)
  updateCandidate(updated: Candidate) {
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
    const all = this.getAllCandidates().map(c =>
      c.id === updated.id ? updated : c
    );
    this.saveAll(all);
  }

<<<<<<< HEAD

=======
  // DELETE
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  deleteCandidate(id: string) {
    const all = this.getAllCandidates().filter(c => c.id !== id);
    this.saveAll(all);
  }

<<<<<<< HEAD
 
=======
  // APPROVE
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  approveCandidate(id: string) {
    const all = this.getAllCandidates();
    const c = all.find(c => c.id === id);
    if (c) {
      c.status = 'approved';
      this.saveAll(all);
    }
  }

<<<<<<< HEAD
=======
  // REJECT
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  rejectCandidate(id: string) {
    const all = this.getAllCandidates();
    const c = all.find(c => c.id === id);
    if (c) {
      c.status = 'rejected';
      this.saveAll(all);
    }
  }
}