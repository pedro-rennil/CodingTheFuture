// src/app/shared/components/document-viewer/document-viewer.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Annotation } from '../../../models/viewer.model';

@Component({
  selector: 'app-document-viewer',
    standalone: true,
  templateUrl: './document-viewer.component.html',
  // O template usará *ngIf para o modal e manipuladores de evento para zoom/seleção
  // ... (Template)
})
export class DocumentViewerComponent {

  // ENTRADAS
  @Input() fileName: string = '';
  @Input() fileContent: string = '';

  // SAÍDAS
  @Output() onClose = new EventEmitter<void>();

  // ESTADO INTERNO (useState do React)
  zoom: number = 100;
  annotations: Annotation[] = []; 
  selectedText: string = '';
  showAnnotationDialog: boolean = false;
  currentAnnotation: string = '';
  editingAnnotation: string | null = null;

  handleZoomIn() {
    if (this.zoom < 200) this.zoom += 10;
  }

  handleZoomOut() {
    if (this.zoom > 50) this.zoom -= 10;
  }

  // A lógica handleTextSelection e handleAddAnnotation deve ser implementada aqui, 
  // usando o estado interno (this.selectedText, this.annotations).
}