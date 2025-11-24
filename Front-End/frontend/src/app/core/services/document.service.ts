// src/app/core/services/document.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/types';
import { TaskService } from './task.service';
import { generateId } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private taskService: TaskService) {}

  /**
   * Simula o processo completo de upload, análise por IA e geração de tarefas.
   */
  simulateDocumentAnalysis(fileName: string, documentId: string): Observable<void> {
    // 1. Simula a chamada à IA para gerar novas tarefas
    const generatedTasks: Task[] = this.generateMockTasksForDocument(fileName, documentId);

    // 2. Adiciona as tarefas recém-geradas ao estado (TaskService)
    // Simula um atraso para mostrar a UI de upload/análise
    setTimeout(() => {
      this.taskService.addTasks(generatedTasks);
    }, 500); 

    // Retorna um Observable de sucesso
    return of(undefined);
  }

  /**
   * Cria tarefas mockadas baseadas no novo documento.
   */
  private generateMockTasksForDocument(fileName: string, documentId: string): Task[] {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 dias

    return [
      {
        id: generateId(),
        title: `Revisar Seção Crítica do ${fileName}`,
        description: 'Foco na segurança e requisitos não funcionais.',
        documentSource: fileName,
        dueDate: futureDate,
        status: 'To Do',
        priority: 'High',
        assignedTo: 'Product Owner',
        estimatedTime: 3,
      },
      {
        id: generateId(),
        title: `Modelar Entidades de ${fileName}`,
        description: 'Criar DTOs e Interfaces TypeScript para a camada de serviço.',
        documentSource: fileName,
        dueDate: futureDate,
        status: 'To Do',
        priority: 'Medium',
        assignedTo: 'Frontend Team',
        estimatedTime: 5,
      }
    ];
  }
}