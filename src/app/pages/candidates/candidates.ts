import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../services/candidate.model';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class CandidatesComponent {

  fullName = '';
  position = '';
  course = ''; // organization
  party = '';

  editingId: string | null = null;
  isEditMode = false;

  // Organizations
  courses: string[] = ['ATLAS', 'USG', 'STCM', 'AEMT'];

  // Dynamic positions
  positions: string[] = [];

  atlasPositions: string[] = [
    'PRESENT',
    'EXTERNAL VICE PRESIDENT',
    'INTERNAL VICE',
    'GENERAL SECRETARY',
    'ASSOCIATE SECRETARY',
    'AUDITOR',
    'TREASURER',
    'EXTERNAL PRO',
    'INTERNAL PRO',
    '2ND GOV',
    '4TH YR GOV',
    '3RD YR GOV'
  ];

  regularPositions: string[] = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Auditor',
    'PRO'
  ];

  constructor(public candidateService: CandidateService) {}

  // When organization changes
  onCourseChange() {
    if (this.course === 'ATLAS') {
      this.positions = this.atlasPositions;
    } else if (
      this.course === 'USG' ||
      this.course === 'STCM' ||
      this.course === 'AEMT'
    ) {
      this.positions = this.regularPositions;
    } else {
      this.positions = [];
    }

    this.position = '';
  }

  // ADD or UPDATE
  registerCandidate() {
    if (!this.fullName || !this.position || !this.course) {
      alert('Please fill all required fields');
      return;
    }

    const candidate: Candidate = {
      id: this.editingId || Date.now().toString(),
      fullName: this.fullName,
      position: this.position,
      organization: this.course,
      party: this.party,
      status: 'pending',
    };

    if (this.isEditMode) {
      this.candidateService.updateCandidate(candidate);
    } else {
      this.candidateService.addCandidate(candidate);
    }

    this.resetForm();
  }

  // Edit
  editCandidate(c: Candidate) {
    this.fullName = c.fullName;
    this.course = c.organization;
    this.onCourseChange();
    this.position = c.position;
    this.party = c.party;

    this.editingId = c.id;
    this.isEditMode = true;
  }

  // Delete
  deleteCandidate(id: string) {
    if (confirm('Delete this candidate?')) {
      this.candidateService.deleteCandidate(id);
    }
  }

  // Reset form
  resetForm() {
    this.fullName = '';
    this.position = '';
    this.course = '';
    this.party = '';
    this.positions = [];
    this.editingId = null;
    this.isEditMode = false;
  }
}