import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatToolbarModule, MatCardModule, 
    MatButtonModule, MatIconModule, MatProgressBarModule, 
    MatInputModule, MatFormFieldModule, MatCheckboxModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  jiraConfig = {
    domain: '',
    email: '',
    token: '',
    projectKey: ''
  };

  rememberMe = false; // Nova variável para o checkbox

  file: File | null = null;
  statusMessage = '';
  isLoading = false;
  draftTasks: any[] = [];
  step: 'config' | 'upload' | 'review' | 'success' = 'config';

  constructor(private http: HttpClient) {
    // Tenta carregar dados salvos assim que o site abre
    this.loadConfig();
  }

  // Função para ler do navegador
  loadConfig() {
    const saved = localStorage.getItem('staf_jira_config');
    if (saved) {
      this.jiraConfig = JSON.parse(saved);
      this.rememberMe = true; // Marca a caixinha automaticamente
    }
  }

  goToUpload() {
    // Se a caixinha estiver marcada, SALVA no navegador
    if (this.rememberMe) {
      localStorage.setItem('staf_jira_config', JSON.stringify(this.jiraConfig));
    } else {
      // Se desmarcou, limpa os dados salvos (segurança)
      localStorage.removeItem('staf_jira_config');
    }
    
    this.step = 'upload';
  }

  // --- NOVA FUNÇÃO: VOLTAR ---
  goBack() {
    if (this.step === 'upload') {
      this.step = 'config'; // Volta para editar credenciais
    } else if (this.step === 'review') {
      this.step = 'upload'; // Volta para escolher outro arquivo
      this.draftTasks = []; // Limpa a lista atual para evitar confusão
    }
  }

  backToHome() {
    this.file = null;
    this.draftTasks = [];
    this.step = 'config'; // <--- AQUI ESTÁ A DIFERENÇA
    this.statusMessage = '';
  }

  // ... (MANTENHA O RESTO DO CÓDIGO IGUAL: onFileSelected, onAnalyze, etc) ...
  
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.statusMessage = '';
  }

  onAnalyze() {
    if (!this.file) return;
    this.isLoading = true;
    this.statusMessage = 'Analisando documento...';

    const formData = new FormData();
    formData.append('pdf', this.file);

    this.http.post<any[]>('http://localhost:3000/analyze', formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.draftTasks = response;
        this.step = 'review';
        this.statusMessage = '';
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
        this.statusMessage = 'Erro na análise.';
      }
    });
  }

  // Função inteligente para extrair dados do link
  onDomainChange(valor: string) {
    // 1. Tenta encontrar a sigla do projeto na URL (padrão /projects/SIGLA)
    const matchProjeto = valor.match(/projects\/([A-Z0-9]+)/);
    if (matchProjeto && matchProjeto[1]) {
      this.jiraConfig.projectKey = matchProjeto[1];
    }

    // 2. Limpa o domínio para ficar apenas a base (https://xxx.atlassian.net)
    // Isso evita erros de conexão, pois a API exige apenas a base.
    try {
      const url = new URL(valor);
      // Se for um link atlassian, pega só a origem
      if (url.hostname.includes('atlassian.net')) {
        this.jiraConfig.domain = url.origin; 
      }
    } catch (e) {
      // Se o usuário digitou algo que não é URL ainda, ignora
    }
  }

  removeTask(index: number) {
    this.draftTasks.splice(index, 1);
  }

  onConfirmToJira() {
    this.isLoading = true;
    this.statusMessage = 'Autenticando e criando tarefas no seu Jira...';

    const payload = {
      tasks: this.draftTasks,
      config: this.jiraConfig
    };

    this.http.post<any>('http://localhost:3000/create-issues', payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.step = 'success';
        this.statusMessage = '';
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
        this.statusMessage = 'Erro ao criar no Jira. Verifique suas credenciais.';
      }
    });
  }

  reset() {
    this.file = null;
    this.draftTasks = [];
    this.step = 'upload'; 
    this.statusMessage = '';
  }
}