// src/app/core/services/toast.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  /** Exibe uma mensagem de sucesso no console. */
  success(message: string, title: string = 'Sucesso'): void {
    console.log(`✅ ${title}: ${message}`);
  }

  /** Exibe uma mensagem de erro no console. */
  error(message: string, title: string = 'Erro'): void {
    console.error(`❌ ${title}: ${message}`);
  }

  /** Exibe uma mensagem de aviso no console. */
  warning(message: string, title: string = 'Aviso'): void {
    // AGORA TEMOS O MÉTODO 'warning' COMPLETO
    console.warn(`⚠️ ${title}: ${message}`); 
  }
  
  /** Exibe uma mensagem de informação no console. */
  info(message: string, title: string = 'Informação'): void {
    console.info(`ℹ️ ${title}: ${message}`);
  }
}