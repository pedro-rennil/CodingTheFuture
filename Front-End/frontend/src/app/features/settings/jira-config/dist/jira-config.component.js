"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JiraConfigComponent = void 0;
// src/app/features/settings/jira-config/jira-config.component.ts
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var JiraConfigComponent = /** @class */ (function () {
    function JiraConfigComponent() {
        // ENTRADA
        this.isConnected = false;
        // SAÍDA
        this.onConnect = new core_1.EventEmitter();
        // ESTADO INTERNO (Substitui useState do React)
        this.config = {
            url: '',
            email: '',
            apiToken: '',
            project: ''
        };
    }
    // Substitui handleConnect do React
    JiraConfigComponent.prototype.handleConnect = function () {
        this.onConnect.emit(this.config);
    };
    Object.defineProperty(JiraConfigComponent.prototype, "isFormValid", {
        get: function () {
            return !!this.config.url && !!this.config.email && !!this.config.apiToken && !!this.config.project;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], JiraConfigComponent.prototype, "isConnected");
    __decorate([
        core_1.Output()
    ], JiraConfigComponent.prototype, "onConnect");
    JiraConfigComponent = __decorate([
        core_1.Component({
            selector: 'app-jira-config',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.FormsModule],
            template: "\n    <form>\n        <input type=\"text\" [(ngModel)]=\"config.url\" name=\"url\" placeholder=\"Jira URL\">\n        <input type=\"email\" [(ngModel)]=\"config.email\" name=\"email\" placeholder=\"Email\">\n        <button\n            (click)=\"handleConnect()\"\n            [disabled]=\"!isFormValid\"\n        >\n          {{ isConnected ? \"Update Connection\" : \"Connect to Jira\" }}\n        </button>\n    </form>\n  "
        })
    ], JiraConfigComponent);
    return JiraConfigComponent;
}());
exports.JiraConfigComponent = JiraConfigComponent;
