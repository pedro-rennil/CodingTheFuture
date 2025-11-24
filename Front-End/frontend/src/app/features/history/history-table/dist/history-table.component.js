"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HistoryTableComponent = void 0;
var core_1 = require("@angular/core");
// O mockHistory deve ser injetado via serviço de dados ou definido em mocks/
var HistoryTableComponent = /** @class */ (function () {
    function HistoryTableComponent() {
        // === ESTADO INTERNO (USAR STATE DO REACT) ===
        // Nota: tasks e historyItems devem vir de um Service real
        this.mockHistory = [
            { id: '1', fileName: 'requirements-v2.pdf', date: '13 Nov 2024, 14:30', tasksGenerated: 8, status: "completed", uploadedBy: "User" },
        ];
        this.searchQuery = '';
        this.dateFilter = 'all';
        this.statusFilter = 'all';
    }
    HistoryTableComponent.prototype.ngOnInit = function () {
        // Inicialização, se necessário
    };
    Object.defineProperty(HistoryTableComponent.prototype, "filteredHistory", {
        get: function () {
            var _this = this;
            // Implementa a lógica de filtragem do React aqui
            return this.mockHistory.filter(function (item) {
                var matchesSearch = item.fileName.toLowerCase().includes(_this.searchQuery.toLowerCase());
                var matchesStatus = _this.statusFilter === 'all' || item.status === _this.statusFilter;
                // Adicione a lógica de filtro por data aqui, se for complexa.
                return matchesSearch && matchesStatus;
            });
        },
        enumerable: false,
        configurable: true
    });
    HistoryTableComponent = __decorate([
        core_1.Component({
            selector: 'app-history-table',
            standalone: true,
            templateUrl: './history-table.component.html',
            styleUrls: ['./history-table.component.css']
        })
    ], HistoryTableComponent);
    return HistoryTableComponent;
}());
exports.HistoryTableComponent = HistoryTableComponent;
