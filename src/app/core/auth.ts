import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  login(cpf: string, password: string) {
    return this.http.post<{ access: string; refresh: string }>(
      `${this.base}/auth/token/`,
      { cpf, password }
    ).pipe(
      tap(tokens => {
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('refresh', tokens.refresh);
      })
    );
  }

  get token() {
    return localStorage.getItem('access');
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  isLoggedIn() {
    return !!this.token;
  }
}
