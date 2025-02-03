import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { Router } from '@angular/router';

declare var bootstrap: any; // Ensure bootstrap is available for modal functionality

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;  // Stores the user being edited

  constructor(private userInfoService: UserInfoService,private router:Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  // Fetch all users
  getAllUsers(): void {
    this.userInfoService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  // Set selected user for editing and open modal
  editUser(user: any): void {
    this.selectedUser = { ...user }; // Create a copy of the user object to avoid reference issues
    const modalElement = document.getElementById('editUserModal');
    const modal = new bootstrap.Modal(modalElement);  // Create and show the modal
    modal.show();  // Show the modal
  }

  // Update user details
  updateUser(): void {
    if (!this.selectedUser) return;

    this.userInfoService.updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe(() => {
        this.getAllUsers();  // Refresh the user list after update
        this.selectedUser = null;  // Clear selection
        const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        modal.hide();  // Hide the modal after update
      });
  }

  // Delete a user
  deleteUser(id: number): void {
    this.userInfoService.deleteUser(id).subscribe(() => {
      this.getAllUsers();
    });
  }


   usersData(): void {
    this.router.navigate(['usersData']);
  }
}
