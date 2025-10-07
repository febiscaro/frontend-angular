import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService, Chamado } from '../../core/tickets';
import { CommonModule, DatePipe } from '@angular/common';  // Importando DatePipe

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, DatePipe],  // Adicionando DatePipe nos imports
  templateUrl: './tickets-list.html',
  styleUrls: ['./tickets-list.scss'],
})
export class TicketsListComponent {
  private api = inject(TicketsService);
  private router = inject(Router);

  data: Chamado[] = [];
  count = 0;
  page = 1;
  loading = false;
  error = '';

  ngOnInit() {
    this.load();
  }

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
      },
    });
  }

  // Função para editar
  editChamado(id: number) {
    console.log('Editar chamado', id);
    // Lógica de edição
  }

  // Função para excluir
  deleteChamado(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este chamado?');
    if (confirmDelete) {
      console.log('Chamado excluído', id);
      // Chamada para a API de exclusão
    }
  }
}
