





// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserInfoService } from '../user-info.service';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-userdata',
//   templateUrl: './userdata.component.html',
//   styleUrls: ['./userdata.component.css']
// })
// export class UserdataComponent implements OnInit {
//   userData: any[] = []; // Change to array to store multiple records
//   username: string | null = null;

//   constructor(
//     private userInfoService: UserInfoService,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.username = this.authService.username || this.authService.currentUserValue?.name;
//     console.log("Logged-in username:", this.username);

//     if (this.username) {
//       this.getUserData();
//     } else {
//       alert("User not found. Please login again.");
//       this.router.navigate(['/login']);
//     }
//   }

//   // Fetch all records for the logged-in user
//   getUserData(): void {
//     this.userInfoService.getUserByName(this.username!).subscribe(
//       data => {
//         if (data && data.length > 0) {
//           this.userData = data; // Store all records
//         } else {
//           alert("No records found.");
//           this.userData = [];
//         }
//       },
//       error => {
//         console.error("Error fetching user data:", error);
//         alert("User not found.");
//         this.userData = [];
//       }
//     );
//   }

//   back(): void {
//     this.router.navigate(['user']);
//   }
// }







import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  userData: any[] = []; // Store all records
  filteredData: any[] = []; // Store filtered records based on search query
  username: string | null = null;
  searchQuery: string = ''; // Store the search query

  constructor(
    private userInfoService: UserInfoService,
    private router: Router,
    private authService: AuthService
  ) {}

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

  // Fetch all records for the logged-in user
  getUserData(): void {
    this.userInfoService.getUserByName(this.username!).subscribe(
      data => {
        if (data && data.length > 0) {
          this.userData = data; // Store all records
          this.filteredData = data; // Initially display all records
        } else {
          alert("No records found.");
          this.userData = [];
          this.filteredData = [];
        }
      },
      error => {
        console.error("Error fetching user data:", error);
        alert("User not found.");
        this.userData = [];
        this.filteredData = [];
      }
    );
  }

  // Filter records based on search query
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    
    // Filter users based on username or technology
    this.filteredData = this.userData.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.technology.toLowerCase().includes(query)
    );
  }

  back(): void {
    this.router.navigate(['user']);
  }
}



