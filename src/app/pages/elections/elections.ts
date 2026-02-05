import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StudentAccount, StudentAccountService } from '../../services/student-account.service';

interface PositionCandidates {
  position: string;
  candidates: { id: string; name: string }[];
}

@Component({
  selector: 'app-elections',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './elections.html',
  styleUrl: './elections.css',
})
export class Elections {
  student?: StudentAccount;
  hasAlreadyVoted = false;

  positions: PositionCandidates[] = [
    {
      position: 'President',
      candidates: [
        { id: 'pres-1', name: 'Candidate A' },
        { id: 'pres-2', name: 'Candidate B' },
      ],
    },
    {
      position: 'Vice President',
      candidates: [
        { id: 'vp-1', name: 'Candidate C' },
        { id: 'vp-2', name: 'Candidate D' },
      ],
    },
    {
      position: 'Secretary',
      candidates: [
        { id: 'sec-1', name: 'Candidate E' },
        { id: 'sec-2', name: 'Candidate F' },
      ],
    },
  ];

  /**
   * Holds the selected candidate ID per position name.
   */
  selection: { [position: string]: string } = {};

  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private readonly auth: AuthService,
    private readonly studentAccounts: StudentAccountService,
    private readonly router: Router
  ) {
    const currentUser = this.auth.getCurrentUser();

    if (!currentUser) {
      // Not logged in at all – send to login page
      this.router.navigate(['/']);
      return;
    }

    if (currentUser.role !== 'student' || !currentUser.studentId) {
      // Logged in but not a student (e.g. admin) – keep them in the admin area
      this.router.navigate(['/dashboard']);
      return;
    }

    const student = this.studentAccounts.getAll().find((s) => s.id === currentUser.studentId);

    if (!student) {
      // Logged-in student record not found; fall back to login
      this.router.navigate(['/']);
      return;
    }

    this.student = student;
    this.hasAlreadyVoted = !!student.hasVoted;
  }

  submitVote(): void {
    this.message = '';
    this.messageType = '';

    if (!this.student) {
      this.router.navigate(['/']);
      return;
    }

    if (this.hasAlreadyVoted) {
      this.message = 'You have already cast your vote.';
      this.messageType = 'error';
      return;
    }

    // Ensure all positions have a selection
    const missing = this.positions.filter(
      (p) => !this.selection[p.position] || !this.selection[p.position].trim()
    );

    if (missing.length) {
      this.message = 'Please vote for all positions before submitting.';
      this.messageType = 'error';
      return;
    }

    this.saveBallot();
    this.studentAccounts.markVoted(this.student.id);
    this.hasAlreadyVoted = true;

    this.message = 'Your vote has been recorded. Thank you for voting!';
    this.messageType = 'success';
  }

  private saveBallot(): void {
    if (typeof localStorage === 'undefined' || !this.student) {
      return;
    }

    const key = 'evoting_ballots';
    const raw = localStorage.getItem(key);

    let ballots: unknown = [];
    if (raw) {
      try {
        ballots = JSON.parse(raw);
      } catch {
        ballots = [];
      }
    }

    const list = Array.isArray(ballots) ? ballots : [];

    list.push({
      studentId: this.student.id,
      submittedAt: new Date().toISOString(),
      choices: this.selection,
    });

    localStorage.setItem(key, JSON.stringify(list));
  }
}
