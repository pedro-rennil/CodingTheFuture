"use strict";
// src/app/core/services/task.service.ts
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.TaskService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var mock_data_1 = require("../data/mock-data"); // Importa a lista de dados mock
var TaskService = /** @class */ (function () {
    function TaskService() {
        this.tasksSubject = new rxjs_1.BehaviorSubject([]);
        this.actionHistorySubject = new rxjs_1.BehaviorSubject([]);
        // Adiciona o Observable de loading para o Dashboard
        this.loadingSubject = new rxjs_1.BehaviorSubject(false);
        this.isLoading$ = this.loadingSubject.asObservable();
        this.tasks$ = this.tasksSubject.asObservable();
        this.actionHistory$ = this.actionHistorySubject.asObservable();
        // Carrega as tarefas iniciais assim que o serviço é construído, ou use o método abaixo
    }
    // --- MÉTODOS ADICIONADOS PARA COMPATIBILIDADE COM DASHBOARD/DOCUMENT SERVICE ---
    /**
     * Simula o carregamento inicial de tarefas (chamado pelo DashboardComponent).
     */
    TaskService.prototype.loadInitialTasks = function () {
        var _this = this;
        if (this.tasksSubject.getValue().length === 0) {
            this.loadingSubject.next(true);
            // Simula um atraso de rede
            setTimeout(function () {
                _this.tasksSubject.next(mock_data_1.MOCK_TASKS);
                _this.loadingSubject.next(false);
            }, 500);
        }
    };
    /**
     * Adiciona novas tarefas (chamado pelo DocumentService após análise da IA).
     */
    TaskService.prototype.addTasks = function (newTasks) {
        var currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next(__spreadArrays(currentTasks, newTasks));
        // OPCIONAL: Adicionar ao histórico, se desejar.
    };
    /**
     * Wrapper para o método updateTask para mudar apenas o status.
     * Chamado pelo EnhancedBacklogPanelComponent.
     */
    TaskService.prototype.updateTaskStatus = function (taskId, newStatus) {
        this.updateTask(taskId, { status: newStatus });
    };
    // --- MÉTODOS EXISTENTES (COMPLETOS) ---
    // Mantido:
    TaskService.prototype.setTasks = function (tasks) {
        this.tasksSubject.next(tasks);
    };
    // Mantido (melhorado com tipagem correta para o histórico):
    TaskService.prototype.updateTask = function (id, updates) {
        var tasks = this.tasksSubject.value;
        var index = tasks.findIndex(function (t) { return t.id === id; });
        if (index === -1)
            return;
        var previousTask = tasks[index];
        this.addToHistory({
            type: 'update',
            task: previousTask,
            previousState: previousTask
        });
        tasks[index] = __assign(__assign({}, tasks[index]), updates);
        this.tasksSubject.next(__spreadArrays(tasks));
    };
    // Mantido:
    TaskService.prototype.deleteTask = function (id) {
        var tasks = this.tasksSubject.value;
        var task = tasks.find(function (t) { return t.id === id; });
        if (task) {
            this.addToHistory({ type: 'delete', task: task });
        }
        this.tasksSubject.next(tasks.filter(function (t) { return t.id !== id; }));
    };
    // Mantido:
    TaskService.prototype.undoLastAction = function () {
        var history = this.actionHistorySubject.value;
        if (history.length === 0)
            return;
        var lastAction = history[history.length - 1];
        var tasks = this.tasksSubject.value;
        // Lógica robusta de undo mantida
        if (lastAction.type === 'delete') {
            this.tasksSubject.next(__spreadArrays(tasks, [lastAction.task]));
        }
        else if (lastAction.type === 'update' && lastAction.previousState) {
            var index = tasks.findIndex(function (t) { return t.id === lastAction.previousState.id; });
            if (index !== -1) {
                tasks[index] = lastAction.previousState;
                this.tasksSubject.next(__spreadArrays(tasks));
            }
        }
        this.actionHistorySubject.next(history.slice(0, -1));
    };
    // Mantido:
    TaskService.prototype.addToHistory = function (action) {
        var history = this.actionHistorySubject.value;
        this.actionHistorySubject.next(__spreadArrays(history, [action]));
    };
    TaskService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
