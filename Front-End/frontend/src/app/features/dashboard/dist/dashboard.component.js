"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var document_upload_component_1 = require("../upload-analise/document-upload/document-upload.component");
var enhanced_backlog_panel_component_1 = require("../backlog-panel/enhanced-backlog-panel/enhanced-backlog-panel.component");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(taskService) {
        this.taskService = taskService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // Carrega a lista de tarefas através do TaskService
        this.tasks$ = this.taskService.tasks$;
        this.isLoading$ = this.taskService.isLoading$;
        // Simula o carregamento inicial das tarefas
        this.taskService.loadInitialTasks();
    };
    /**
     * Lida com a mudança de status de uma tarefa, disparada pelo BacklogPanel.
     */
    DashboardComponent.prototype.onTaskStatusChange = function (event) {
        this.taskService.updateTaskStatus(event.id, event.newStatus);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            standalone: true,
            imports: [
                common_1.NgIf,
                common_1.AsyncPipe,
                document_upload_component_1.DocumentUploadComponent,
                enhanced_backlog_panel_component_1.EnhancedBacklogPanelComponent
            ],
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
