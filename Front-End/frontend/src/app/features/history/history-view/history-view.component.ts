import { Component } from '@angular/core';
import { HistoryItem } from '../../../models/history.model'; // Para tipagem
import { HistoryTableComponent } from '../history-table/history-table.component';

@Component({
  selector: 'app-history-view',
  imports: [HistoryTableComponent],
  template: `
    <div class="space-y-4">
        <h2>Histórico de Análises</h2>
        <app-history-table></app-history-table>
    </div>
  `,
  styleUrls: ['./history-view.component.css']
})
export class HistoryViewComponent {
  // Nenhuma lógica, apenas apresentação
}