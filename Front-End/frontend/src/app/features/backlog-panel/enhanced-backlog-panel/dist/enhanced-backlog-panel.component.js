"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EnhancedBacklogPanelComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var editable_backlog_table_component_1 = require("../editable-backlog-table/editable-backlog-table.component");
var EnhancedBacklogPanelComponent = /** @class */ (function () {
    function EnhancedBacklogPanelComponent() {
        // ENTRADAS (Props do App.tsx)
        this.tasks = [];
        this.canUndo = false;
        this.isCreating = null; // ID da tarefa em criação
        // SAÍDAS (Handlers do App.tsx)
        this.onUpdateTask = new core_1.EventEmitter();
        this.onDeleteTask = new core_1.EventEmitter();
        this.onCreateTask = new core_1.EventEmitter();
        this.onUndoAction = new core_1.EventEmitter();
        this.onCreateInJira = new core_1.EventEmitter(); // Para o botão 'Criar no Jira'
        // ESTADO INTERNO (useState do React)
        this.isEditingId = null;
        this.deleteConfirmId = null;
        this.editedTask = null;
        this.activeTab = 'backlog';
        this.searchQuery = '';
        this.filterType = 'all';
        // O restante da lógica de edição (startEdit, saveEdit, handleDelete) segue o mesmo padrão
        // de emissão de eventos para o AppComponent (como no exemplo anterior).
    }
    __decorate([
        core_1.Input()
    ], EnhancedBacklogPanelComponent.prototype, "tasks");
    __decorate([
        core_1.Input()
    ], EnhancedBacklogPanelComponent.prototype, "canUndo");
    __decorate([
        core_1.Input()
    ], EnhancedBacklogPanelComponent.prototype, "isCreating");
    __decorate([
        core_1.Output()
    ], EnhancedBacklogPanelComponent.prototype, "onUpdateTask");
    __decorate([
        core_1.Output()
    ], EnhancedBacklogPanelComponent.prototype, "onDeleteTask");
    __decorate([
        core_1.Output()
    ], EnhancedBacklogPanelComponent.prototype, "onCreateTask");
    __decorate([
        core_1.Output()
    ], EnhancedBacklogPanelComponent.prototype, "onUndoAction");
    __decorate([
        core_1.Output()
    ], EnhancedBacklogPanelComponent.prototype, "onCreateInJira");
    EnhancedBacklogPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-enhanced-backlog-panel',
            standalone: true,
            imports: [
                common_1.CommonModule, editable_backlog_table_component_1.EditableBacklogTableComponent
            ],
            // O template renderizará os sub-componentes (BacklogTable, EditableBacklogTable, Tabs, Filtros)
            template: "\n    <div class=\"panel-container\">\n      <div class=\"tabs-e-filtros\">\n        <button (click)=\"activeTab = 'backlog'\">Backlog</button>\n        <button (click)=\"activeTab = 'created'\">Criadas</button>\n        </div>\n      \n      <app-editable-backlog-table\n        *ngIf=\"activeTab === 'backlog'\"\n        [tasks]=\"tasks\"\n        (onUpdateTask)=\"onUpdateTask.emit($event)\"\n        (onDeleteTask)=\"onDeleteTask.emit($event)\"\n        (onCreateInJira)=\"onCreateInJira.emit($event)\"\n      ></app-editable-backlog-table>\n      \n      <button \n        *ngIf=\"canUndo\" \n        (click)=\"onUndoAction.emit()\"\n      >\n        Desfazer A\u00E7\u00E3o\n      </button>\n      \n      </div>\n  "
        })
    ], EnhancedBacklogPanelComponent);
    return EnhancedBacklogPanelComponent;
}());
exports.EnhancedBacklogPanelComponent = EnhancedBacklogPanelComponent;
