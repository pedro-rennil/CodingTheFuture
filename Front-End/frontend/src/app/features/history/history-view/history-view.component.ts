import { Component } from '@angular/core';
import { HistoryItem } from '../../../models/history.model'; // Para tipagem

@Component({
  selector: 'app-history-view',
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