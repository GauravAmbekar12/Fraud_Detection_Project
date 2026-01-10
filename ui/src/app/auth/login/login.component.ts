import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, // Ensuring standalone if using modern Angular
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Added for styling if needed
})
export class LoginComponent {
  data = { username: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.data).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid credentials');
      }
    });
  }

  // Method to navigate to the registration page
  goToRegister() {
    this.router.navigate(['/register']);
  }
}