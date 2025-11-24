import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // NOVO IMPORT
import { FormsModule } from '@angular/forms';

import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-editable-backlog-table',
  imports: [
      FormsModule,
      CommonModule
    ],
  templateUrl: './editable-backlog-table.component.html',
  styleUrls: ['./editable-backlog-table.component.css']
})
export class EditableBacklogTableComponent {
  // === ENTRADAS (PROPS DO REACT) ===
  @Input() tasks: Task[] = [];

  // === SAÍDAS (HANDLERS DE EVENTO DO REACT) ===
  @Output() onUpdateTask = new EventEmitter<Task>();
  @Output() onDeleteTask = new EventEmitter<string>();
  @Output() onCreateInJira = new EventEmitter<string>(); // Chamado pelo BacklogTable/EnhancedBacklogPanel
  
  // === ESTADO INTERNO (USAR STATE DO REACT) ===
  isEditingId: string | null = null;
  deleteConfirmId: string | null = null;
  editedTask: Task | null = null;

  // Lógica de manipulação de edição
  startEdit(task: Task): void {
    this.isEditingId = task.id;
    // Cria uma cópia profunda para evitar mutação direta do @Input
    this.editedTask = { ...task }; 
  }

  saveEdit(): void {
    if (this.editedTask) {
      this.onUpdateTask.emit(this.editedTask); // Emite para o AppComponent
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.isEditingId = null;
    this.editedTask = null;
  }
  
  // Lógica de manipulação de exclusão
  confirmDelete(taskId: string): void {
    this.deleteConfirmId = taskId;
  }
  
  // Confirmação final de exclusão
  handleDelete(): void {
      if (this.deleteConfirmId) {
          this.onDeleteTask.emit(this.deleteConfirmId); // Emite para o AppComponent
          this.deleteConfirmId = null;
      }
  }
}