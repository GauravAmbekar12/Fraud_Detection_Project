import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true, // Use if your project is based on Standalone Components
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  // Added the email field to the data object
  data = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

register() {
  this.auth.register(this.data).subscribe({
    next: (res: any) => {
      alert(res.message ?? 'Registration successful');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert(err.error?.message || 'Registration failed');
    }
  });
}


  goToLogin() {
    this.router.navigate(['/login']);
  }
}