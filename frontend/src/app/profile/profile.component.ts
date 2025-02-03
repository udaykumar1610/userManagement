import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = null;  // Store only the logged-in user's data
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.username || this.authService.currentUserValue?.name;
    console.log("Logged-in username:", this.username);

    if (this.username) {
      this.getUserData();
    } else {
      alert("User not found. Please login again.");
      this.router.navigate(['/login']);
    }
  }

  // Fetch user details based on username
  getUserData(): void {
    this.authService.getUsers().subscribe(
      data => {
        console.log("All users:", data);
        // Filter the user based on logged-in username
        const user = data.find((u: any) => u.name === this.username);
        
        if (user) {
          this.userData = user;
        } else {
          alert("User data not found.");
        }
      },
      error => {
        console.error("Error fetching user data:", error);
        alert("Error fetching user details.");
      }
    );
  }

  dashBoard(){
    if(this.userData.role=="admin"){
      this.router.navigate(['/admin-dashboard'])
    }else{
      this.router.navigate(['/user-dashboard'])
    }
  }
}
