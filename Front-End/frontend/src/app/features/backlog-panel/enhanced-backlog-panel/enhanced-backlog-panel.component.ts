import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../../../models/task.model'; // Seu modelo de tarefa

@Component({
  selector: 'app-enhanced-backlog-panel',
  standalone: true,
  imports: [
    CommonModule
  ],
  // O template renderizará os sub-componentes (BacklogTable, EditableBacklogTable, Tabs, Filtros)
  template: `
    <div class="panel-container">
      <div class="tabs-e-filtros">
        <button (click)="activeTab = 'backlog'">Backlog</button>
        <button (click)="activeTab = 'created'">Criadas</button>
        </div>
      
      <app-editable-backlog-table
        *ngIf="activeTab === 'backlog'"
        [tasks]="tasks"
        (onUpdateTask)="onUpdateTask.emit($event)"
        (onDeleteTask)="onDeleteTask.emit($event)"
        (onCreateInJira)="onCreateInJira.emit($event)"
      ></app-editable-backlog-table>
      
      <button 
        *ngIf="canUndo" 
        (click)="onUndoAction.emit()"
      >
        Desfazer Ação
      </button>
      
      </div>
  `,
  // ... (Metadata)
})
export class EnhancedBacklogPanelComponent {

  // ENTRADAS (Props do App.tsx)
  @Input() tasks: Task[] = [];
  @Input() canUndo: boolean = false;
  @Input() isCreating: string | null = null; // ID da tarefa em criação

  // SAÍDAS (Handlers do App.tsx)
  @Output() onUpdateTask = new EventEmitter<Task>();
  @Output() onDeleteTask = new EventEmitter<string>();
  @Output() onCreateTask = new EventEmitter<Task>();
  @Output() onUndoAction = new EventEmitter<void>();
  @Output() onCreateInJira = new EventEmitter<string>(); // Para o botão 'Criar no Jira'

  // ESTADO INTERNO (useState do React)
  isEditingId: string | null = null;
  deleteConfirmId: string | null = null;
  editedTask: Task | null = null;
  activeTab: 'backlog' | 'created' | 'dependencies' = 'backlog';
  searchQuery: string = '';
  filterType: string = 'all';

  // O restante da lógica de edição (startEdit, saveEdit, handleDelete) segue o mesmo padrão
  // de emissão de eventos para o AppComponent (como no exemplo anterior).
}