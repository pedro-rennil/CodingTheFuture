// src/app/core/utils/helpers.ts

import { Task } from '../models/types';

/**
 * Gera uma string de ID pseudo-única.
 */
export function generateId(): string {
  // Combina timestamp e um número aleatório
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Traduz a prioridade de inglês para português para exibição.
 */
export function translatePriority(priority: Task['priority']): string {
    const translations: Record<Task['priority'], string> = {
        'High': 'Alta',
        'Medium': 'Média',
        'Low': 'Baixa'
    };
    return translations[priority] || priority;
}