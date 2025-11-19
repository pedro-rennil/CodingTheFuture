// src/app/features/settings/jira-config/jira-config.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JiraConfig } from '../../../models/jira.model';

@Component({
  selector: 'app-jira-config',
  template: `
    <form>
        <input type="text" [(ngModel)]="config.url" name="url" placeholder="Jira URL">
        <input type="email" [(ngModel)]="config.email" name="email" placeholder="Email">
        <button 
            (click)="handleConnect()" 
            [disabled]="!isFormValid"
        >
          {{ isConnected ? "Update Connection" : "Connect to Jira" }}
        </button>
    </form>
  `,
  // ... (Metadata)
})
export class JiraConfigComponent {

  // ENTRADA
  @Input() isConnected: boolean = false;

  // SAÍDA
  @Output() onConnect = new EventEmitter<JiraConfig>();

  // ESTADO INTERNO (Substitui useState do React)
  config: JiraConfig = {
    url: '',
    email: '',
    apiToken: '',
    project: '',
  };
  
  // Substitui handleConnect do React
  handleConnect() {
    this.onConnect.emit(this.config);
  }

  get isFormValid(): boolean {
    return !!this.config.url && !!this.config.email && !!this.config.apiToken && !!this.config.project;
  }
}