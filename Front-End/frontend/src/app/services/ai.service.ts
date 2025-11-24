// src/app/services/ai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Task } from '../core/models/task.model';
import { MOCK_TASKS, MOCK_DOCUMENT_CONTENT } from '../core/data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  
  // Endpoint que você criou no Spring Boot
  private aiAnalyzeUrl = '/api/requisitos/extrair';

  constructor(private http: HttpClient) { }

  // Simula o handleAnalyze: Envia o documento e recebe as tarefas do backend
  analyzeDocument(file: File | string): Observable<{ tasks: Task[], content: string }> {
    // Para o MVP na 2ª Semana, simule a latência e o retorno do backend:
    console.log('Análise de IA iniciada. Chamando o backend...');
    
    // Substitua o 'of()' e 'delay()' pela chamada HTTP real quando o backend estiver pronto
    // return this.http.post<{ tasks: Task[], content: string }>(this.aiAnalyzeUrl, { file });
    
    // Mocking: Simula a resposta do Agente de IA com 3 segundos de delay
    return of({
      tasks: MOCK_TASKS, // Seus dados mockTasks (Agora Task[])
      content: MOCK_DOCUMENT_CONTENT,
    }).pipe(delay(3000));
  }
}