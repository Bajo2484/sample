import { Injectable } from '@angular/core';

<<<<<<< HEAD
export type UserRole = 'admin' | 'student' | 'elecom';

export interface CurrentUser {
  role: UserRole;
  studentId?: string;       
  elecomUsername?: string; 
=======
export type UserRole = 'admin' | 'student';

export interface CurrentUser {
  role: UserRole;
  /**
   * Only set when the current user is a student.
   */
  studentId?: string;
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'evoting_current_user';
  private currentUser?: CurrentUser;

  constructor() {
    this.currentUser = this.loadFromStorage();
  }

  private loadFromStorage(): CurrentUser | undefined {
<<<<<<< HEAD
    if (typeof localStorage === 'undefined') return undefined;

    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return undefined;
=======
    if (typeof localStorage === 'undefined') {
      return undefined;
    }

    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      return undefined;
    }
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a

    try {
      return JSON.parse(raw) as CurrentUser;
    } catch {
      return undefined;
    }
  }

  private saveToStorage(user: CurrentUser | undefined): void {
<<<<<<< HEAD
    if (typeof localStorage === 'undefined') return;
=======
    if (typeof localStorage === 'undefined') {
      return;
    }
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a

    if (!user) {
      localStorage.removeItem(this.STORAGE_KEY);
      return;
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  setCurrentUser(user: CurrentUser): void {
    this.currentUser = user;
    this.saveToStorage(user);
  }

  getCurrentUser(): CurrentUser | undefined {
    return this.currentUser;
  }

  clear(): void {
    this.currentUser = undefined;
    this.saveToStorage(undefined);
  }

<<<<<<< HEAD
 
=======
>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isStudent(): boolean {
    return this.currentUser?.role === 'student';
  }
<<<<<<< HEAD

  isElecom(): boolean {
    return this.currentUser?.role === 'elecom';
  }


  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
=======
}

>>>>>>> 8ccb40de7f1159cb0de74a78380d18a8ca31a88a
