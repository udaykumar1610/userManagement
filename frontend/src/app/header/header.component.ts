import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';  // Import AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;  // Flag to track login status

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();  // Check login status

    // Subscribe to user status
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;  // Update login status based on currentUser
    });
  }

  onLogout(): void {
    this.authService.logout();  // Call logout method to log out the user
  }
}
