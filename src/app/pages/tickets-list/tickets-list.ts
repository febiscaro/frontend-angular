import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketsService, Ticket, Page } from '../../core/tickets';

type Groups = {
  abertos: Ticket[];
  andamento: Ticket[];
  suspensos: Ticket[];
  concluidos: Ticket[];
  cancelados: Ticket[];
};

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, DatePipe, NgClass, RouterModule],
  templateUrl: './tickets-list.html',
  styleUrls: ['./tickets-list.scss']
})
export class TicketsListComponent implements OnInit {
  loading = false;
  error = '';

  page!: Page<Ticket>;
  pageIndex = 1;
  pageSize = 6;

  groups: Groups = { abertos: [], andamento: [], suspensos: [], concluidos: [], cancelados: [] };

  open = { abertos: true, andamento: true, suspensos: false, concluidos: false, cancelados: false };

  constructor(private api: TicketsService) {}

  ngOnInit(): void { this.load(); }

  load(page = this.pageIndex) {
  this.loading = true;
  this.error = '';
  this.api.list(page, this.pageSize).subscribe({
    next: (data) => {
      this.page = data;
      this.pageIndex = page;
      this.groups = this.buildGroups(data.results || []);
      this.loading = false;
    },
    error: (e) => {
      console.error('tickets load error:', e);
      this.error = e?.error?.detail || e?.message || 'Erro ao carregar tickets.';
      this.loading = false;
    }
  });
}



  setPageSize(size: number | string) {
    this.pageSize = Number(size);
    this.load(1);
  }

  private normStatus(s?: string): keyof Groups {
    const v = (s || '').toLowerCase().trim();
    if (['aberto', 'abertos', 'open'].includes(v)) return 'abertos';
    if (['em_andamento', 'andamento', 'in_progress'].includes(v)) return 'andamento';
    if (['suspenso', 'suspensos', 'paused'].includes(v)) return 'suspensos';
    if (['concluido', 'concluídos', 'concluidos', 'done', 'fechado'].includes(v)) return 'concluidos';
    if (['cancelado', 'cancelados', 'canceled'].includes(v)) return 'cancelados';
    return 'abertos';
  }

  private buildGroups(list: Ticket[]): Groups {
    const g: Groups = { abertos: [], andamento: [], suspensos: [], concluidos: [], cancelados: [] };
    for (const t of list) g[this.normStatus(t.status)].push(t);
    return g;
  }

  // >>> AQUI: como exibir um texto legível do tipo, independente do formato
  tipoText(t: Ticket): string {
    return (t as any).tipo_nome
        || (t as any).tipo_label
        || (typeof t.tipo === 'string' ? t.tipo : (t.tipo != null ? String(t.tipo) : ''));
  }

  get countAbertos() { return this.groups.abertos.length; }
  get countAndamento() { return this.groups.andamento.length; }
  get countSuspensos() { return this.groups.suspensos.length; }
  get countConcluidos() { return this.groups.concluidos.length; }
  get countCancelados() { return this.groups.cancelados.length; }
}
