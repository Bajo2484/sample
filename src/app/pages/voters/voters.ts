import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentAccount, StudentAccountService } from '../../services/student-account.service';

@Component({
  selector: 'app-voters',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './voters.html',
  styleUrl: './voters.css',
})
export class Voters {
  students: StudentAccount[] = [];

  newStudent: {
    id: string;
    name: string;
    course: string;
    yearLevel: string;
    section: string;
    password: string;
  } = {
    id: '',
    name: '',
    course: '',
    yearLevel: '',
    section: '',
    password: '',
  };

  errorMessage = '';
  successMessage = '';

  constructor(private readonly studentAccounts: StudentAccountService) {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.studentAccounts.getAll();
  }

  addStudent(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const id = this.newStudent.id.trim();
    const name = this.newStudent.name.trim();
    const course = this.newStudent.course.trim();
    const yearLevel = this.newStudent.yearLevel.trim();
    const section = this.newStudent.section.trim();
    const password = this.newStudent.password.trim();

    if (!id || !name || !password) {
      this.errorMessage = 'Student ID, full name, and password are required.';
      return;
    }

    try {
      this.studentAccounts.add({
        id,
        name,
        course,
        yearLevel,
        section,
        password,
        hasVoted: false,
      });

      this.successMessage = 'Student account created successfully.';
      this.newStudent = {
        id: '',
        name: '',
        course: '',
        yearLevel: '',
        section: '',
        password: '',
      };
      this.loadStudents();
    } catch (error) {
      this.errorMessage =
        (error instanceof Error && error.message) || 'Unable to create student account.';
    }
  }

  deleteStudent(id: string): void {
    if (!confirm('Remove this student account?')) {
      return;
    }

    this.studentAccounts.delete(id);
    this.loadStudents();
  }

}
