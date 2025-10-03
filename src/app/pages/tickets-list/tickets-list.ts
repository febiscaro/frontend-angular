import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TicketsService, Chamado } from '../../core/tickets';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './tickets-list.html',
  styleUrls: ['./tickets-list.scss'],
})
export class TicketsListComponent {
  private api = inject(TicketsService);

  data: Chamado[] = [];
  count = 0;
  page = 1;
  loading = false;
  error = '';

  ngOnInit() { this.load(); }

  load(p = 1) {
    this.loading = true;
    this.error = '';
    this.api.list(p).subscribe({
      next: (res) => {
        this.data = res.results;
        this.count = res.count;
        this.page = p;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.detail || 'Falha ao carregar tickets';
        this.loading = false;
      }
    });
  }
}
