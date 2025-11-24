"use strict";
// src/app/core/services/document.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocumentService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var helpers_1 = require("../utils/helpers");
var DocumentService = /** @class */ (function () {
    function DocumentService(taskService) {
        this.taskService = taskService;
    }
    /**
     * Simula o processo completo de upload, análise por IA e geração de tarefas.
     */
    DocumentService.prototype.simulateDocumentAnalysis = function (fileName, documentId) {
        var _this = this;
        // 1. Simula a chamada à IA para gerar novas tarefas
        var generatedTasks = this.generateMockTasksForDocument(fileName, documentId);
        // 2. Adiciona as tarefas recém-geradas ao estado (TaskService)
        // Simula um atraso para mostrar a UI de upload/análise
        setTimeout(function () {
            _this.taskService.addTasks(generatedTasks);
        }, 500);
        // Retorna um Observable de sucesso
        return rxjs_1.of(undefined);
    };
    /**
     * Cria tarefas mockadas baseadas no novo documento.
     */
    DocumentService.prototype.generateMockTasksForDocument = function (fileName, documentId) {
        var today = new Date();
        var futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 dias
        return [
            {
                id: helpers_1.generateId(),
                title: "Revisar Se\u00E7\u00E3o Cr\u00EDtica do " + fileName,
                description: 'Foco na segurança e requisitos não funcionais.',
                documentSource: fileName,
                dueDate: futureDate,
                status: 'To Do',
                priority: 'High',
                assignedTo: 'Product Owner',
                estimatedTime: 3
            },
            {
                id: helpers_1.generateId(),
                title: "Modelar Entidades de " + fileName,
                description: 'Criar DTOs e Interfaces TypeScript para a camada de serviço.',
                documentSource: fileName,
                dueDate: futureDate,
                status: 'To Do',
                priority: 'Medium',
                assignedTo: 'Frontend Team',
                estimatedTime: 5
            }
        ];
    };
    DocumentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
