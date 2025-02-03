import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  nameSearch: string = ''; // Store the name input
  userData: any = null;
  newUser = {
    name: '',
    technology: '',
    graduation: '',
    experience: 0,
    skills: '',
    aadhar_pan: ''
  };

  constructor(private userInfoService: UserInfoService,private router:Router) {}

  ngOnInit(): void {}

  // Fetch user details by name
  getUserData(): void {
    if (!this.nameSearch.trim()) {
      alert("Please enter a valid name.");
      return;
    }

    this.userInfoService.getUserByName(this.nameSearch).subscribe(
      data => {
        if (data) {
          this.userData = data;
        } else {
          alert("User not found.");
          this.userData = null;
        }
      },
      error => {
        console.error("Error fetching user data:", error);
        alert("User not found.");
        this.userData = null;
      }
    );
  }

  // Create new user
  createUser(): void {
    if (!this.newUser.name.trim()) {
      alert("name is required.");
      return;
    }

    this.userInfoService.createUser(this.newUser).subscribe(() => {
      alert("User created successfully.");
      this.newUser = { name: '', technology: '', graduation: '', experience: 0, skills: '', aadhar_pan: '' };
    }, error => {
      console.error("Error creating user:", error);
      alert("Error creating user.");
    });
  }
  accessData(){
    this.router.navigate(['userdata']);
  }
}
