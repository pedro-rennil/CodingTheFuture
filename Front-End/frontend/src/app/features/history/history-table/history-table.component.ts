import { Component, Input, OnInit } from '@angular/core';
import { HistoryItem } from '../../../models/history.model';
// O mockHistory deve ser injetado via serviço de dados ou definido em mocks/

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent implements OnInit {
  
  // === ESTADO INTERNO (USAR STATE DO REACT) ===
  // Nota: tasks e historyItems devem vir de um Service real
  mockHistory: HistoryItem[] = [
    { id: '1', fileName: 'requirements-v2.pdf', date: '13 Nov 2024, 14:30', tasksGenerated: 8, status: "completed", uploadedBy: "User" },
    // ... outros mocks
  ];
  
  searchQuery: string = '';
  dateFilter: string = 'all';
  statusFilter: string = 'all';

  ngOnInit(): void {
    // Inicialização, se necessário
  }
  
  get filteredHistory(): HistoryItem[] {
    // Implementa a lógica de filtragem do React aqui
    return this.mockHistory.filter(item => {
      const matchesSearch = item.fileName.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || item.status === this.statusFilter;
      // Adicione a lógica de filtro por data aqui, se for complexa.
      return matchesSearch && matchesStatus;
    });
  }
}