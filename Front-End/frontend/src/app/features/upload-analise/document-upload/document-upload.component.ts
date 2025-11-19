import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/task.model'; // Importando seu modelo

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent {

  // ENTRADAS (Recebe do AppComponent - Lógica de UI do App.tsx)
  @Input() isAnalyzing: boolean = false;
  @Input() progress: number = 0;
  @Input() isComplete: boolean = false;
  @Input() viewingDocumentName: string | null = null;

  // SAÍDAS (Emite para o AppComponent - Substitui o 'handleAnalyze')
  @Output() fileUpload = new EventEmitter<File>();
  @Output() viewLastDocument = new EventEmitter<void>();

  selectedFile: File | null = null;
  
  // Função que lida com a seleção de arquivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Função que emite o arquivo para o AppComponent
  startAnalysis() {
    if (this.selectedFile) {
      this.fileUpload.emit(this.selectedFile);
    }
  }
}