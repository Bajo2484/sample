<<<<<<< HEAD
import { Component, HostListener } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../services/candidate.model';
<<<<<<< HEAD
import Swal from 'sweetalert2';
=======
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidates.html',
<<<<<<< HEAD
  styleUrls: ['./candidates.css']
=======
  styleUrl: './candidates.css',
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
})
export class CandidatesComponent {

  fullName = '';
  position = '';
<<<<<<< HEAD
  course = '';
  partyName = '';
  platform = '';
  editingId: string | null = null;
  isEditMode = false;
  showModal = false;


  courses: string[] = ['ATLAS', 'USG', 'STCM', 'AEMT'];

  positions: string[] = [];

  atlasPositions: string[] = [
    'PRESIDENT',
    'EXTERNAL VICE PRESIDENT',
    'INTERNAL VICE PRESIDENT',
=======
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
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
    'GENERAL SECRETARY',
    'ASSOCIATE SECRETARY',
    'AUDITOR',
    'TREASURER',
    'EXTERNAL PRO',
    'INTERNAL PRO',
    '2ND GOV',
<<<<<<< HEAD
    '3RD YR GOV',
    '4TH YR GOV'
=======
    '4TH YR GOV',
    '3RD YR GOV'
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  ];

  regularPositions: string[] = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Auditor',
    'PRO'
  ];

<<<<<<< HEAD
 
  photoPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(public candidateService: CandidateService) {
    this.candidateService.loadCandidates();
  }

 
  openModal() {
    this.showModal = true;
    this.isEditMode = false;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  
  onCourseChange() {
    if (this.course === 'ATLAS') {
      this.positions = [...this.atlasPositions];
    } else if (['USG', 'STCM', 'AEMT'].includes(this.course)) {
      this.positions = [...this.regularPositions];
    } else {
      this.positions = [];
    }
    this.position = '';
  }

 
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => this.photoPreview = reader.result;
    reader.readAsDataURL(this.selectedFile);
  }

  async registerCandidate() {

    if (!this.fullName || !this.position || !this.course) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill all required fields!',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    const id = this.editingId || Date.now().toString();

    const candidate: Candidate = {
      id,
      fullName: this.fullName,
      position: this.position,
      organization: this.course,
      partyName: this.partyName,
      platform: this.platform,
      status: 'pending',
      photoUrl: ''
    };

    try {

      if (this.selectedFile) {
        await this.candidateService.uploadPhoto(
          this.selectedFile,
          this.fullName.replace(/\s+/g, '_')
        );
        candidate.photoUrl = this.selectedFile.name;
      }

      if (this.isEditMode) {

        await this.candidateService.updateCandidate(id, candidate);

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Candidate successfully updated!',
          confirmButtonColor: '#28a745'
        });

      } else {

        await this.candidateService.addCandidate(candidate);

        Swal.fire({
          icon: 'success',
          title: 'Registered!',
          text: 'Candidate successfully added!',
          confirmButtonColor: '#28a745'
        });
      }

      this.closeModal(); 
    } catch (error) {

      console.error('Error saving candidate:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save candidate. Please try again.',
        confirmButtonColor: '#d33'
      });
    }
  }

=======
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
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  editCandidate(c: Candidate) {
    this.fullName = c.fullName;
    this.course = c.organization;
    this.onCourseChange();
    this.position = c.position;
<<<<<<< HEAD
    this.partyName = c.partyName || '';
    this.platform = c.platform || '';
    this.editingId = c.id;
    this.isEditMode = true;
    this.photoPreview = c.photoUrl || null;

    this.showModal = true; 

    Swal.fire({
      icon: 'info',
      title: 'Edit Mode',
      text: 'You are now editing this candidate.',
      timer: 1500,
      showConfirmButton: false
    });
  }


  async deleteCandidate(id: string) {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This candidate will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {

      await this.candidateService.deleteCandidate(id);

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Candidate has been deleted.',
        confirmButtonColor: '#28a745'
      });
    }
  }


=======
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
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  resetForm() {
    this.fullName = '';
    this.position = '';
    this.course = '';
<<<<<<< HEAD
    this.partyName = '';
    this.platform = '';
    this.positions = [];
    this.editingId = null;
    this.isEditMode = false;
    this.selectedFile = null;
    this.photoPreview = null;
=======
    this.party = '';
    this.positions = [];
    this.editingId = null;
    this.isEditMode = false;
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  }
}