import { Component } from '@angular/core';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { StudentAccount, StudentAccountService } from '../../services/student-account.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
=======
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentAccount, StudentAccountService } from '../../services/student-account.service';
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a

@Component({
  selector: 'app-voters',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './voters.html',
<<<<<<< HEAD
  styleUrls: ['./voters.css']
})
export class VotersComponent {
  students: StudentAccount[] = [];

  showModal = false;
  isEditMode = false; 
  newStudent: StudentAccount = this.resetStudent();

  constructor(private studentService: StudentAccountService) {
    this.loadStudents();
  }

  loadStudents() {
    this.students = this.studentService.getAll();
  }


  openModal() {
    this.showModal = true;
    this.isEditMode = false;
    this.newStudent = this.resetStudent();
  }

  closeModal() {
    this.showModal = false;
    this.newStudent = this.resetStudent();
  }


  editStudent(student: StudentAccount) {
    this.newStudent = { ...student };
    this.isEditMode = true;
    this.showModal = true;
  }


  saveStudent() {
    if (!this.newStudent.id || !this.newStudent.firstName || !this.newStudent.lastName || !this.newStudent.password) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'ID, First Name, Last Name, and Password are required.',
      });
      return;
    }

    if (this.isEditMode) {
      this.studentService.update(this.newStudent);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Student information has been updated.',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      this.studentService.add({ ...this.newStudent });
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'New student has been registered.',
        timer: 2000,
        showConfirmButton: false
      });
    }

    this.closeModal();
    this.loadStudents();
  }

  
  deleteStudent(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This student account will be removed permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.delete(id);
        this.loadStudents();
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Student account has been removed.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

 
  private resetStudent(): StudentAccount {
    return {
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      yearLevel: '',
      section: '',
      status: 'Undergraduate',
      email: '',
      mobile: '',
      password: '',
      hasVoted: false
    };
  }
=======
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

>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
}
