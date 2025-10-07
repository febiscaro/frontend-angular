import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loading = false;
  error = '';
  // <<<<<< IMPORTANTe: existe loginData.cpf e loginData.senha
  loginData = { cpf: '', senha: '' };

  constructor(private auth: AuthService, private router: Router) {}

  async submit() {
    this.error = '';
    this.loading = true;
    try {
      await this.auth.login(this.loginData.cpf, this.loginData.senha);
      this.router.navigate(['/tickets']);
    } catch (e: any) {
      this.error = 'Falha no login. Confira CPF e senha.';
    } finally {
      this.loading = false;
    }
  }
}
