import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public username: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());
    this.currentUser = this.currentUserSubject.asObservable();
    this.username = this.getStoredUser()?.name || null;
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(this.handleError),
      tap(response => {
        if (response.token) {
          this.storeUserData(response);
        }
        this.username = response.name;
        console.log("Logged-in username:", this.username);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.username = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getStoredUser();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getStoredUser(): any {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  private storeUserData(userData: any): void {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.currentUserSubject.next(userData);
    this.username = userData.name; // Store username after login
  }

  private handleError(error: any): Observable<any> {
    console.error('Error occurred:', error);
    return throwError(error);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users` );
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5000/api/auth';
//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;
// username:any;
//   constructor(private http: HttpClient, private router: Router) {
//     this.currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue() {
//     return this.currentUserSubject.value;
//   }

//   register(user: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, user).pipe(
//       catchError(this.handleError)
//     );
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
//       catchError(this.handleError),
//       tap(response => {
//         if (response.token) {
//           this.storeUserData(response);
//         }
//         this.username=response.name;
//         console.log(this.username);
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/login']);
//   }

//   isLoggedIn(): boolean {
//     return !!this.getStoredUser();
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   private getStoredUser(): any {
//     const userData = localStorage.getItem('currentUser');
//     return userData ? JSON.parse(userData) : null;
//   }

//   private storeUserData(userData: any): void {
//     localStorage.setItem('token', userData.token);
//     localStorage.setItem('currentUser', JSON.stringify(userData));
//     this.currentUserSubject.next(userData);
//   }

//   private handleError(error: any): Observable<any> {
//     console.error('Error occurred:', error);
//     return throwError(error);
//   }
// }
