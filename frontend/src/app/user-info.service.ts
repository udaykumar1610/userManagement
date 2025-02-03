

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserInfoService {
//   private apiUrl = 'http://localhost:5000/api/usersinfo';

//   constructor(private http: HttpClient) { }

//   // Create user
//   createUser(user: any): Observable<any> {
//     return this.http.post(this.apiUrl, user);
//   }

//   // Get user's own data (Assuming backend has an endpoint for this)
//   getUserById(id: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }

//   getUserByName(username: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/name/${username}`);
//   }

//   // Get all users (Admin)
//   getAllUsers(): Observable<any> {
//     return this.http.get(this.apiUrl);
//   }

//   // Update user (Admin)
//   updateUser(id: number, user: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, user);
//   }

//   // Delete user (Admin)
//   deleteUser(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private apiUrl = 'http://localhost:5000/api/usersinfo';

  constructor(private http: HttpClient, private authService: AuthService) {}

  
  private getAuthHeaders() {
    const token = this.authService.getToken();
    return token ? { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) } : {};
  }
  
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user,this.getAuthHeaders());
  }
  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl, this.getAuthHeaders());
  }
  // getUserByName(username: string): Observable<any> {
  //       return this.http.get(`${this.apiUrl}/name/${username}` );
  //     }




  // getUserByName(name: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/name/${name}`, this.getAuthHeaders());
  // }
  getUserByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/name/${name}`, this.getAuthHeaders());
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, this.getAuthHeaders());
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
