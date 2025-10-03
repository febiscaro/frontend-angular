import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Chamado {
  id: number;
  status: string;
  tratativa_adm: string;
  criado_em: string;
  atualizado_em: string;
  suspenso_em: string | null;
  atendente_nome: string;
  anexo_adm: string | null;
  solicitante: number;
  tipo: number;
}

@Injectable({ providedIn: 'root' })
export class TicketsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  list(page = 1) {
    const params = new HttpParams().set('page', page);
    return this.http.get<{ count: number; next: string | null; previous: string | null; results: Chamado[] }>(
      `${this.base}/tickets/`,
      { params }
    );
  }
}
