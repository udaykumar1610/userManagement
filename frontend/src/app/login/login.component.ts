import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      // Ensure email and password are strings
      if (email && password) {
        this.authService.login(email, password).subscribe(
          data => {
            console.log(data);
            if (data.role === "admin") {
              this.router.navigate(['admin-dashboard']);
            } else {
              this.router.navigate(['user-dashboard']);
            }
          },
          error => {
            console.error('Login error:', error);
          }
        );
      } else {
        console.error('Email or password is invalid');
      }
    }
  }
  
}
