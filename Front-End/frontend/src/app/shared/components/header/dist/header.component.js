"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        // ENTRADAS (Input props do React)
        this.userName = '';
        // SAÍDAS (Handlers de evento do React)
        this.onLogout = new core_1.EventEmitter();
        this.onNavigateToProfile = new core_1.EventEmitter();
        // ESTADO INTERNO (useState do React)
        this.showLogoutDialog = false;
    }
    Object.defineProperty(HeaderComponent.prototype, "initials", {
        get: function () {
            if (!this.userName)
                return '';
            return this.userName
                .split(" ")
                .map(function (n) { return n[0]; })
                .join("")
                .toUpperCase()
                .slice(0, 2);
        },
        enumerable: false,
        configurable: true
    });
    HeaderComponent.prototype.handleLogoutClick = function () {
        this.showLogoutDialog = true;
    };
    HeaderComponent.prototype.confirmLogout = function () {
        this.showLogoutDialog = false;
        this.onLogout.emit(); // Emite o evento para o AppComponent
    };
    __decorate([
        core_1.Input()
    ], HeaderComponent.prototype, "userName");
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "onLogout");
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "onNavigateToProfile");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            template: "\n    <header>\n      <div class=\"flex h-full items-center justify-between px-4\">\n        <button (click)=\"onNavigateToProfile.emit()\">\n          <span>{{ userName }}</span>\n        </button>\n        \n        <button (click)=\"handleLogoutClick()\">\n          Sair\n        </button>\n      </div>\n    </header>\n\n    <div *ngIf=\"showLogoutDialog\" class=\"dialog-overlay\">\n        <h2>Confirmar Sa\u00EDda</h2>\n        <p>Tem certeza que deseja sair?</p>\n        <button (click)=\"showLogoutDialog = false\">Cancelar</button>\n        <button (click)=\"confirmLogout()\">Sim, Sair</button>\n    </div>\n  ",
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
