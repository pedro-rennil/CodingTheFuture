import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

/**
 * Função de guarda que verifica se o usuário está logado.
 * Redireciona para /login se não estiver logado.
 */
export const AuthGuard: CanActivateFn = (route, state) => {
  // Funções inject() obtêm services dentro de uma função guard.
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  return authService.isLoggedIn$.pipe(
    take(1), // Pega o valor atual do Observable e completa
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true; // Permite o acesso à rota
      } else {
        // Redireciona para a página de login e mostra uma mensagem
        toastService.warning('Você precisa estar logado para acessar esta página.', 'Acesso Negado');
        return router.createUrlTree(['/login']); // Redireciona
      }
    })
  );
};