import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access';

  constructor(private http: HttpClient) {}

  async login(cpf: string, password: string): Promise<void> {
    const url = `${environment.apiUrl}/auth/token/`;
    const resp = await this.http.post<{ access: string }>(url, { cpf, password }).toPromise();
    if (!resp?.access) throw new Error('sem token');
    localStorage.setItem(this.tokenKey, resp.access);
  }

  logout() { localStorage.removeItem(this.tokenKey); }

  get token(): string | null { return localStorage.getItem(this.tokenKey); }

  isLoggedIn(): boolean { return !!this.token; }
}
