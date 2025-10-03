import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  cpf = '';
  password = '';
  loading = false;
  error = '';

  submit() {
    if (!this.cpf || !this.password) return;
    this.loading = true;
    this.error = '';
    this.auth.login(this.cpf, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tickets']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.detail || 'CPF ou senha inválidos';
      }
    });
  }
}
