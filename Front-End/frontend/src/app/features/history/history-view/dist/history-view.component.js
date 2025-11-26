"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HistoryViewComponent = void 0;
var core_1 = require("@angular/core");
var history_table_component_1 = require("../history-table/history-table.component");
var HistoryViewComponent = /** @class */ (function () {
    function HistoryViewComponent() {
    }
    HistoryViewComponent = __decorate([
        core_1.Component({
            selector: 'app-history-view',
            imports: [history_table_component_1.HistoryTableComponent],
            template: "\n    <div class=\"space-y-4\">\n        <h2>Hist\u00F3rico de An\u00E1lises</h2>\n        <app-history-table></app-history-table>\n    </div>\n  ",
            styleUrls: ['./history-view.component.css']
        })
    ], HistoryViewComponent);
    return HistoryViewComponent;
}());
exports.HistoryViewComponent = HistoryViewComponent;
