"use strict";
exports.__esModule = true;
exports.AuthGuard = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var auth_service_1 = require("../services/auth.service");
var toast_service_1 = require("../services/toast.service");
/**
 * Função de guarda que verifica se o usuário está logado.
 * Redireciona para /login se não estiver logado.
 */
exports.AuthGuard = function (route, state) {
    // Funções inject() obtêm services dentro de uma função guard.
    var authService = core_1.inject(auth_service_1.AuthService);
    var router = core_1.inject(router_1.Router);
    var toastService = core_1.inject(toast_service_1.ToastService);
    return authService.isLoggedIn$.pipe(rxjs_1.take(1), // Pega o valor atual do Observable e completa
    rxjs_1.map(function (isLoggedIn) {
        if (isLoggedIn) {
            return true; // Permite o acesso à rota
        }
        else {
            // Redireciona para a página de login e mostra uma mensagem
            toastService.warning('Você precisa estar logado para acessar esta página.', 'Acesso Negado');
            return router.createUrlTree(['/login']); // Redireciona
        }
    }));
};
