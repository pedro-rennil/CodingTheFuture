// src/app/models/task.model.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  type: "Story" | "Task" | "Bug";
  priority: "High" | "Medium" | "Low";
  storyPoints: number;
  estimatedHours: number;
  status: "new" | "analyzing" | "created";
}

export interface ActionHistory {
  type: "delete" | "update";
  task: Task;
  previousState?: Task;
}

// O mock data deve ser movido para um arquivo de mock separado ou usado no serviço de teste