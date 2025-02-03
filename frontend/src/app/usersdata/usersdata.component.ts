import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersdata',
  templateUrl: './usersdata.component.html',
  styleUrls: ['./usersdata.component.css']
})
export class UsersdataComponent implements OnInit {
  users: any[] = [];          // Stores all users
  filteredUsers: any[] = [];  // Stores filtered users based on search query
  searchQuery: string = '';   // Stores the search query input

  constructor(private userInfoService: UserInfoService,private router:Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  // Fetch all users
  getAllUsers(): void {
    this.userInfoService.getAllUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;  // Initially, show all users
    });
  }

  // Filter users based on the search query
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();

    // Filter users based on name (case-insensitive search)
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(query)
    );
  }
  data(): void {
    this.router.navigate(['admin']);
  }
}
