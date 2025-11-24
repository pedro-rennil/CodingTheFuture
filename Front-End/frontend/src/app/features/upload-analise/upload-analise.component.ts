import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DocumentService } from '../../core/services/document.service';
import { ToastService } from '../../core/services/toast.service';
import { generateId } from '../../core/utils/helpers'; // Assume que este helper existe

@Component({
  selector: 'app-upload-analise', // Novo selector
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-analise.component.html', // Usaremos um template .html
  styleUrls: ['./upload-analise.component.scss']
})
export class UploadAnaliseComponent implements OnInit {
  
  uploadForm!: FormGroup;
  selectedFile: File | null = null;
  isAnalyzing: boolean = false;
  analysisProgress: number = 0;
  viewingDocumentName: string | null = null;
  
  // Interval ID para simular o progresso
  private progressInterval: any;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário reativo com um controle obrigatório para o arquivo
    this.uploadForm = this.fb.group({
      documentFile: [null, Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.viewingDocumentName = null;
      // Atribui o nome do arquivo ao form control para passar na validação
      this.uploadForm.get('documentFile')?.setValue(this.selectedFile.name);
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      this.toastService.error('Selecione um arquivo para análise.', 'Erro de Upload');
      return;
    }

    this.isAnalyzing = true;
    this.analysisProgress = 0;
    const fileName = this.selectedFile.name;
    const documentId = generateId(); 

    // 1. Simular barra de progresso
    this.progressInterval = setInterval(() => {
      if (this.analysisProgress < 95) {
        this.analysisProgress += 5;
      }
    }, 150);

    // 2. Chamar o serviço que simula a análise (e adiciona tarefas ao TaskService)
    this.documentService.simulateDocumentAnalysis(fileName, documentId)
      .pipe(
        // Finalize garante que o intervalo seja limpo, mesmo em erro
        finalize(() => {
          clearInterval(this.progressInterval);
          this.isAnalyzing = false;
        })
      )
      .subscribe({
        next: () => {
          this.analysisProgress = 100;
          this.viewingDocumentName = fileName;
          this.toastService.success('Análise de IA concluída! Tarefas adicionadas ao backlog.', 'Sucesso');
          this.uploadForm.reset(); // Limpa o formulário
          this.selectedFile = null;
          
          // Reseta a barra de progresso após um pequeno delay visual
          setTimeout(() => this.analysisProgress = 0, 500);
        },
        error: (err) => {
          this.toastService.error('Falha na análise. Tente novamente.', 'Erro de Serviço');
          this.viewingDocumentName = null;
        }
      });
  }
}