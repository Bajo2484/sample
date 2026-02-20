import { Injectable } from '@angular/core';

export interface StudentAccount {
<<<<<<< HEAD
  id: string; 
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  yearLevel: string;
  section: string;
  status: 'Undergraduate' | 'Graduate';
  email: string;
  mobile: string;
  password: string;
  hasVoted: boolean;
}


=======
  /**
   * Unique student identifier (e.g. student number / ID).
   */
  id: string;
  /**
   * Full name of the student.
   */
  name: string;
  /**
   * Optional course or program.
   */
  course: string;
  /**
   * Optional year level (e.g. 1st Year, 2nd Year).
   */
  yearLevel: string;
  /**
   * Optional section or block.
   */
  section: string;
  /**
   * Password that the student will use to log in.
   * NOTE: For a real system this must be stored on a secure backend
   * and hashed – this front-end-only storage is for demonstration only.
   */
  password: string;
  /**
   * Flag indicating whether this student has already cast a vote.
   */
  hasVoted: boolean;
}

>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
@Injectable({
  providedIn: 'root',
})
export class StudentAccountService {
  private readonly STORAGE_KEY = 'evoting_students';
<<<<<<< HEAD
  students: any;

  /* Returns all registered student accounts from localStorage.*/
=======

  /**
   * Returns all registered student accounts from localStorage.
   */
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  getAll(): StudentAccount[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed as StudentAccount[];
      }
      return [];
    } catch {
      return [];
    }
  }

  private saveAll(list: StudentAccount[]): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
  }

<<<<<<< HEAD
=======
  /**
   * Adds a new student account. Throws if the ID is already taken.
   */
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  add(student: StudentAccount): void {
    const current = this.getAll();

    if (current.some((s) => s.id === student.id)) {
      throw new Error('A student with this ID already exists.');
    }

    current.push(student);
    this.saveAll(current);
  }

<<<<<<< HEAD
 
=======
  /**
   * Deletes a student account by ID.
   */
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  delete(id: string): void {
    const current = this.getAll();
    const filtered = current.filter((s) => s.id !== id);
    this.saveAll(filtered);
  }

<<<<<<< HEAD
  update(updatedStudent: StudentAccount): void {
    const index = this.students.findIndex((s: { id: string; }) => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = { ...updatedStudent };
      this.saveAll(this.students);
    }
  }


=======
  /**
   * Looks up a student account using their ID and password.
   */
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  findByCredentials(id: string, password: string): StudentAccount | undefined {
    return this.getAll().find((s) => s.id === id && s.password === password);
  }

<<<<<<< HEAD
  
=======
  /**
   * Marks the specified student as having voted.
   */
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  markVoted(id: string): void {
    const current = this.getAll();
    const index = current.findIndex((s) => s.id === id);

    if (index === -1) {
      return;
    }

    current[index] = { ...current[index], hasVoted: true };
    this.saveAll(current);
  }
}

