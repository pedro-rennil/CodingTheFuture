export interface HistoryItem {
  id: string;
  fileName: string;
  date: string;
  tasksGenerated: number;
  status: "completed" | "processing" | "failed";
  uploadedBy?: string;
}