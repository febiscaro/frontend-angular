import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Ticket {
  id: number;
  status: string;
  tipo?: number | string;
  tipo_label?: string;
  tipo_nome?: string;
  solicitante?: string | number;
  created_at?: string;
}

export interface Page<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private http: HttpClient) {}

  private normalizePage<T>(resp: any): Page<T> {
    if (Array.isArray(resp)) {
      // API sem paginação
      return { count: resp.length, next: null, previous: null, results: resp as T[] };
    }
    if (resp && Array.isArray(resp.results)) {
      // DRF paginado
      return resp as Page<T>;
    }
    // objeto único ou formato inesperado
    const arr = resp ? [resp as T] : [];
    return { count: arr.length, next: null, previous: null, results: arr };
  }

  list(page = 1, pageSize = 6): Observable<Page<Ticket>> {
    const url = `${environment.apiUrl}/tickets/?page=${page}&page_size=${pageSize}`;
    return this.http.get<any>(url).pipe(map(r => this.normalizePage<Ticket>(r)));
  }

  get(id: number) {
    return this.http.get<Ticket>(`${environment.apiUrl}/tickets/${id}/`);
  }
}
