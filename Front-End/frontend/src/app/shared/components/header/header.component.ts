// src/app/shared/components/header/header.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <div class="flex h-full items-center justify-between px-4">
        <button (click)="onNavigateToProfile.emit()">
          <span>{{ userName }}</span>
        </button>
        
        <button (click)="handleLogoutClick()">
          Sair
        </button>
      </div>
    </header>

    <div *ngIf="showLogoutDialog" class="dialog-overlay">
        <h2>Confirmar Saída</h2>
        <p>Tem certeza que deseja sair?</p>
        <button (click)="showLogoutDialog = false">Cancelar</button>
        <button (click)="confirmLogout()">Sim, Sair</button>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // ENTRADAS (Input props do React)
  @Input() userName: string = '';

  // SAÍDAS (Handlers de evento do React)
  @Output() onLogout = new EventEmitter<void>();
  @Output() onNavigateToProfile = new EventEmitter<void>();

  // ESTADO INTERNO (useState do React)
  showLogoutDialog: boolean = false; 

  get initials(): string {
    if (!this.userName) return '';
    return this.userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  handleLogoutClick() {
    this.showLogoutDialog = true;
  }

  confirmLogout() {
    this.showLogoutDialog = false;
    this.onLogout.emit(); // Emite o evento para o AppComponent
  }
}