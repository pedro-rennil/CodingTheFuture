"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AiService = void 0;
// src/app/services/ai.service.ts
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var mock_data_1 = require("../core/data/mock-data");
var AiService = /** @class */ (function () {
    function AiService(http) {
        this.http = http;
        // Endpoint que você criou no Spring Boot
        this.aiAnalyzeUrl = '/api/requisitos/extrair';
    }
    // Simula o handleAnalyze: Envia o documento e recebe as tarefas do backend
    AiService.prototype.analyzeDocument = function (file) {
        // Para o MVP na 2ª Semana, simule a latência e o retorno do backend:
        console.log('Análise de IA iniciada. Chamando o backend...');
        // Substitua o 'of()' e 'delay()' pela chamada HTTP real quando o backend estiver pronto
        // return this.http.post<{ tasks: Task[], content: string }>(this.aiAnalyzeUrl, { file });
        // Mocking: Simula a resposta do Agente de IA com 3 segundos de delay
        return rxjs_1.of({
            tasks: mock_data_1.MOCK_TASKS,
            content: mock_data_1.MOCK_DOCUMENT_CONTENT
        }).pipe(rxjs_1.delay(3000));
    };
    AiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AiService);
    return AiService;
}());
exports.AiService = AiService;
