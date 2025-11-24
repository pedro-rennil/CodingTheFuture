// src/app/core/services/task.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// Ajuste os imports para o seu modelo:
import { Task } from '../models/types'; // Ajustado para o types.ts que criamos
import { MOCK_TASKS } from '../data/mock-data'; // Importa a lista de dados mock

// Se ActionHistory estiver em types.ts, ajuste o import. Se for um arquivo separado, mantenha.
// Assumindo que você tem uma interface para o histórico, vamos mantê-lo.
interface ActionHistory { 
  type: 'update' | 'delete' | 'add';
  task: Task;
  previousState?: Task; // Use a interface Task correta
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private actionHistorySubject = new BehaviorSubject<ActionHistory[]>([]);
  
  // Adiciona o Observable de loading para o Dashboard
  private loadingSubject = new BehaviorSubject<boolean>(false); 
  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  tasks$ = this.tasksSubject.asObservable();
  actionHistory$ = this.actionHistorySubject.asObservable();

  constructor() {
    // Carrega as tarefas iniciais assim que o serviço é construído, ou use o método abaixo
  }

  // --- MÉTODOS ADICIONADOS PARA COMPATIBILIDADE COM DASHBOARD/DOCUMENT SERVICE ---

  /**
   * Simula o carregamento inicial de tarefas (chamado pelo DashboardComponent).
   */
  loadInitialTasks(): void {
    if (this.tasksSubject.getValue().length === 0) {
      this.loadingSubject.next(true);
      
      // Simula um atraso de rede
      setTimeout(() => {
        this.tasksSubject.next(MOCK_TASKS);
        this.loadingSubject.next(false);
      }, 500);
    }
  }
  
  /**
   * Adiciona novas tarefas (chamado pelo DocumentService após análise da IA).
   */
  addTasks(newTasks: Task[]): void {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, ...newTasks]);
    // OPCIONAL: Adicionar ao histórico, se desejar.
  }

  /**
   * Wrapper para o método updateTask para mudar apenas o status.
   * Chamado pelo EnhancedBacklogPanelComponent.
   */
  updateTaskStatus(taskId: string, newStatus: Task['status']): void {
      this.updateTask(taskId, { status: newStatus });
  }

  // --- MÉTODOS EXISTENTES (COMPLETOS) ---
  
  // Mantido:
  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  // Mantido (melhorado com tipagem correta para o histórico):
  updateTask(id: string, updates: Partial<Task>): void {
    const tasks = this.tasksSubject.value;
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return;

    const previousTask = tasks[index];

    this.addToHistory({
      type: 'update',
      task: previousTask,
      previousState: previousTask
    });

    tasks[index] = { ...tasks[index], ...updates };
    this.tasksSubject.next([...tasks]);
  }

  // Mantido:
  deleteTask(id: string): void {
    const tasks = this.tasksSubject.value;
    const task = tasks.find(t => t.id === id);

    if (task) {
      this.addToHistory({ type: 'delete', task });
    }

    this.tasksSubject.next(tasks.filter(t => t.id !== id));
  }

  // Mantido:
  undoLastAction(): void {
    const history = this.actionHistorySubject.value;
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    const tasks = this.tasksSubject.value;

    // Lógica robusta de undo mantida
    if (lastAction.type === 'delete') {
      this.tasksSubject.next([...tasks, lastAction.task]);
    } else if (lastAction.type === 'update' && lastAction.previousState) {
      const index = tasks.findIndex(t => t.id === lastAction.previousState!.id);
      if (index !== -1) {
        tasks[index] = lastAction.previousState;
        this.tasksSubject.next([...tasks]);
      }
    }

    this.actionHistorySubject.next(history.slice(0, -1));
  }

  // Mantido:
  private addToHistory(action: ActionHistory): void {
    const history = this.actionHistorySubject.value;
    this.actionHistorySubject.next([...history, action]);
  }
}