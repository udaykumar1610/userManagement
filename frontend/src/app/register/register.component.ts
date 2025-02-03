import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationError: string = '';  // To store error message
  
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;

  
      if (password !== confirmPassword) {
        this.registrationError = 'Passwords do not match!';
        return;
      }

      this.authService.register({ name, email, password ,confirmPassword}).subscribe(
        data => {
          console.log('Registration successful:', data);
          this.router.navigate(['/login']);  // Redirect to login page
        },
        error => {
          console.error('Registration error:', error);
          if (error.error && error.error.message) {
            this.registrationError = error.error.message;  // Display the error message
          } else {
            this.registrationError = 'An unexpected error occurred!';
          }
        }
      );
    }
  }
}
