import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + '/auth';  // Replace with actual API base URL

  constructor(private http: HttpClient) { }

  // Get user dashboard
  getUserDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-dashboard`);
  }

  // Get admin dashboard
  getAdminDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin-dashboard`);
  }
}
