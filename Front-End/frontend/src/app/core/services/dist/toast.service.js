"use strict";
// src/app/core/services/toast.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ToastService = void 0;
var core_1 = require("@angular/core");
var ToastService = /** @class */ (function () {
    function ToastService() {
    }
    /** Exibe uma mensagem de sucesso no console. */
    ToastService.prototype.success = function (message, title) {
        if (title === void 0) { title = 'Sucesso'; }
        console.log("\u2705 " + title + ": " + message);
    };
    /** Exibe uma mensagem de erro no console. */
    ToastService.prototype.error = function (message, title) {
        if (title === void 0) { title = 'Erro'; }
        console.error("\u274C " + title + ": " + message);
    };
    /** Exibe uma mensagem de aviso no console. */
    ToastService.prototype.warning = function (message, title) {
        if (title === void 0) { title = 'Aviso'; }
        // AGORA TEMOS O MÉTODO 'warning' COMPLETO
        console.warn("\u26A0\uFE0F " + title + ": " + message);
    };
    /** Exibe uma mensagem de informação no console. */
    ToastService.prototype.info = function (message, title) {
        if (title === void 0) { title = 'Informação'; }
        console.info("\u2139\uFE0F " + title + ": " + message);
    };
    ToastService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ToastService);
    return ToastService;
}());
exports.ToastService = ToastService;
