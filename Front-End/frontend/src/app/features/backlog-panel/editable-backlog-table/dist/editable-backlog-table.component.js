"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditableBacklogTableComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common"); // NOVO IMPORT
var forms_1 = require("@angular/forms");
var EditableBacklogTableComponent = /** @class */ (function () {
    function EditableBacklogTableComponent() {
        // === ENTRADAS (PROPS DO REACT) ===
        this.tasks = [];
        // === SAÍDAS (HANDLERS DE EVENTO DO REACT) ===
        this.onUpdateTask = new core_1.EventEmitter();
        this.onDeleteTask = new core_1.EventEmitter();
        this.onCreateInJira = new core_1.EventEmitter(); // Chamado pelo BacklogTable/EnhancedBacklogPanel
        // === ESTADO INTERNO (USAR STATE DO REACT) ===
        this.isEditingId = null;
        this.deleteConfirmId = null;
        this.editedTask = null;
    }
    // Lógica de manipulação de edição
    EditableBacklogTableComponent.prototype.startEdit = function (task) {
        this.isEditingId = task.id;
        // Cria uma cópia profunda para evitar mutação direta do @Input
        this.editedTask = __assign({}, task);
    };
    EditableBacklogTableComponent.prototype.saveEdit = function () {
        if (this.editedTask) {
            this.onUpdateTask.emit(this.editedTask); // Emite para o AppComponent
            this.cancelEdit();
        }
    };
    EditableBacklogTableComponent.prototype.cancelEdit = function () {
        this.isEditingId = null;
        this.editedTask = null;
    };
    // Lógica de manipulação de exclusão
    EditableBacklogTableComponent.prototype.confirmDelete = function (taskId) {
        this.deleteConfirmId = taskId;
    };
    // Confirmação final de exclusão
    EditableBacklogTableComponent.prototype.handleDelete = function () {
        if (this.deleteConfirmId) {
            this.onDeleteTask.emit(this.deleteConfirmId); // Emite para o AppComponent
            this.deleteConfirmId = null;
        }
    };
    __decorate([
        core_1.Input()
    ], EditableBacklogTableComponent.prototype, "tasks");
    __decorate([
        core_1.Output()
    ], EditableBacklogTableComponent.prototype, "onUpdateTask");
    __decorate([
        core_1.Output()
    ], EditableBacklogTableComponent.prototype, "onDeleteTask");
    __decorate([
        core_1.Output()
    ], EditableBacklogTableComponent.prototype, "onCreateInJira");
    EditableBacklogTableComponent = __decorate([
        core_1.Component({
            selector: 'app-editable-backlog-table',
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule
            ],
            templateUrl: './editable-backlog-table.component.html',
            styleUrls: ['./editable-backlog-table.component.css']
        })
    ], EditableBacklogTableComponent);
    return EditableBacklogTableComponent;
}());
exports.EditableBacklogTableComponent = EditableBacklogTableComponent;
