import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string>('');

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor(private router: Router) { }

  login(email: string, password: string): void {
    // Replace with actual authentication logic
    if (email && password) {
      const name = this.extractNameFromEmail(email);
      this.userNameSubject.next(name);
      this.isLoggedInSubject.next(true);
      this.router.navigate(['/upload']);
    }
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.userNameSubject.next('');
    this.router.navigate(['/login']);
  }

  private extractNameFromEmail(email: string): string {
    return email
      .split('@')[0]
      .split('.')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
