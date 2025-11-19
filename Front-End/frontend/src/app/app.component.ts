// Imports e Injeções
// ...
import { AiService } from './services/ai.service'; 
import { Task, ActionHistory } from './models/task.model';
import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Template que terá o <router-outlet>
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // O estado do App.tsx
  isLoggedIn: boolean = false; 
  userName: string = 'Desenvolvedor Stef';
  activeView: 'upload' | 'backlog' | 'settings' | 'profile' = 'upload';
  tasks: Task[] = [];
  isAnalyzing: boolean = false;
  actionHistory: ActionHistory[] = [];
  // src/app/app.component.ts (dentro da classe AppComponent)

// ... Outras variáveis de estado ...
isAnalyzing: boolean = false;
analysisProgress: number = 0;
isAnalysisComplete: boolean = false;
viewingDocument: { name: string; content: string } | null = null;

// Lógica para simular o progresso (copiada e adaptada do seu App.tsx)
simulateProgress(): void {
    this.analysisProgress = 0;
    const interval = setInterval(() => {
        this.analysisProgress += 10;
        if (this.analysisProgress >= 100) {
            clearInterval(interval);
            this.analysisProgress = 100;
        }
    }, 200);
}

// O método handleAnalyze agora usa a lógica de progresso
handleAnalyze(file: File) {
    this.isAnalyzing = true;
    this.isAnalysisComplete = false;
    this.simulateProgress(); // Inicia a simulação do progresso

    this.aiService.analyzeDocument(file) // Chama o Observable
      .subscribe({
        next: (data) => {
          this.tasks = data.tasks;
          this.viewingDocument = { name: file.name, content: data.content };
          // ... notificação de sucesso
        },
        error: (err) => {
          this.isAnalyzing = false;
          // ... notificação de erro
        },
        complete: () => {
          this.isAnalyzing = false;
          this.isAnalysisComplete = true; // Análise completa
          
          // Simula o Auto-switch to backlog view
          setTimeout(() => {
            this.activeView = 'backlog'; // Ou this.router.navigate(['/backlog'])
            this.isAnalysisComplete = false;
          }, 1500);
        }
      });
}
  
  // Injeção dos serviços
  constructor(private aiService: AiService, private router: Router) { } 
  
  // A lógica handleAnalyze refatorada para Angular/RxJS
  handleAnalyze(file: File) {
    this.isAnalyzing = true;
    
    this.aiService.analyzeDocument(file) // Chama o Observable do serviço
      .subscribe({
        next: (data) => {
          this.tasks = data.tasks;
          // toast.success("Tarefas geradas!"); // Se você usar uma biblioteca de toast
          this.router.navigate(['/backlog']); // Navega para a view de backlog
        },
        error: (err) => {
          console.error("Erro na análise da IA:", err);
          // toast.error("Falha na IA!");
        },
        complete: () => {
          this.isAnalyzing = false;
        }
      });
  }

  // Métodos de manipulação (handleUpdateTask, handleDeleteTask, handleLogin)
  // ... a lógica de manipulação de estado do seu App.tsx deve ser colocada aqui
}