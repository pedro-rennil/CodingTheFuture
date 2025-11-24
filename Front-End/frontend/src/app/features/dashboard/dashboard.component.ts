import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { Task } from '../../core/models/types';
import { TaskService } from '../../core/services/task.service';
import { DocumentUploadComponent } from '../upload-analise/document-upload/document-upload.component';
import { EnhancedBacklogPanelComponent } from '../backlog-panel/enhanced-backlog-panel/enhanced-backlog-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DocumentUploadComponent,
    EnhancedBacklogPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  isLoading$!: Observable<boolean>;
  
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Carrega a lista de tarefas através do TaskService
    this.tasks$ = this.taskService.tasks$;
    this.isLoading$ = this.taskService.isLoading$;
    
    // Simula o carregamento inicial das tarefas
    this.taskService.loadInitialTasks(); 
  }

  /**
   * Lida com a mudança de status de uma tarefa, disparada pelo BacklogPanel.
   */
  onTaskStatusChange(event: { id: string, newStatus: Task['status'] }): void {
    this.taskService.updateTaskStatus(event.id, event.newStatus);
  }
}