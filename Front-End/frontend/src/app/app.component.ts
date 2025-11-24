import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs'; // Adicione este import, pois isLoggedIn$ é um Observable
import { CommonModule, NgClass } from '@angular/common'; // NOVO IMPORT

import { HeaderComponent } from './shared/components/header/header.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Apenas declara a propriedade, tipada como Observable
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {
    // Inicializa a propriedade DENTRO do construtor, onde authService já existe.
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}