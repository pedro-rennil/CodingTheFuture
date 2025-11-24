// src/app/core/models/types.ts

/**
 * Define a estrutura de uma Tarefa (Task) gerada pela IA.
 * Baseado no Guia de Migração.
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  documentSource: string; // Nome do documento que gerou a tarefa
  dueDate: Date;
  status: 'To Do' | 'In Progress' | 'Blocked' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string; // Usuário ou Equipe
  estimatedTime: number; // Horas
}

/**
 * Define a estrutura básica do Perfil do Usuário.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Outros campos como avatar, role, etc.
}