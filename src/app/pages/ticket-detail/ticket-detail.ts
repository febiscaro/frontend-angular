import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService, Ticket } from '../../core/tickets';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.scss']
})
export class TicketDetailComponent implements OnInit {
  loading = true;
  error = '';
  t: Ticket | null = null;

  constructor(private route: ActivatedRoute, private api: TicketsService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.error = 'ID inválido'; this.loading = false; return; }
    this.api.get(id).subscribe({
      next: (ticket) => { this.t = ticket; this.loading = false; },
      error: () => { this.error = 'Não foi possível carregar o chamado.'; this.loading = false; }
    });
  }

  voltar() { this.router.navigate(['/tickets']); }
}
