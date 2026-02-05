import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { StudentAccountService } from '../../services/student-account.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly studentAccounts: StudentAccountService
  ) {}

  login() {
    const trimmedUsername = this.username.trim();
    const trimmedPassword = this.password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert('Enter username and password');
      return;
    }

    // Admin login (fixed credentials)
    if (trimmedUsername === 'admin') {
      if (trimmedPassword === 'admin123') {
        this.auth.setCurrentUser({ role: 'admin' });
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid admin password');
      }
      return;
    }

    // Student login using accounts created by the admin
    const student = this.studentAccounts.findByCredentials(trimmedUsername, trimmedPassword);

    if (!student) {
      alert('Invalid student ID or password');
      return;
    }

    if (student.hasVoted) {
      alert('You have already cast your vote. Thank you!');
      return;
    }

    this.auth.setCurrentUser({ role: 'student', studentId: student.id });
    this.router.navigate(['/elections']);
  }
}