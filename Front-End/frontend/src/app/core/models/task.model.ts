// Exemplo: src/app/core/models/task.model.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  
  // CAMPOS DO SEU MODELO ORIGINAL:
  type?: string; 
  storyPoints?: number;
  estimatedHours?: number; // Seu campo: estimatedHours
  
  // CAMPOS NECESSÁRIOS PARA O FLUXO DA IA/KANBAN:
  documentSource: string; // Fonte do documento que gerou a tarefa
  dueDate: Date; // Data de vencimento
  assignedTo: string; // Usuário ou Equipe
  
  // O STATUS DEVE TER VALORES ENUMERADOS
  status: 'To Do' | 'In Progress' | 'Blocked' | 'Done'; 
  priority: 'Low' | 'Medium' | 'High'; // Manter esta tipagem

  // Usar estimatedTime no TaskService e estimatedHours no mock (se preferir, renomeie um dos dois para ser consistente)
  estimatedTime: number; 
}