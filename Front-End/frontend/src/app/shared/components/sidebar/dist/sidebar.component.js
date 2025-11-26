"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var logo_component_1 = require("../logo/logo.component");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(router) {
        this.router = router;
        this.activeRoute = '';
        this.menuItems = [
            { id: 'upload', label: 'Upload de Documento', icon: 'upload', route: '/upload' },
            { id: 'backlog', label: 'Backlog Gerado', icon: 'list', route: '/backlog' },
            { id: 'profile', label: 'Perfil do Usuário', icon: 'user', route: '/profile' },
            { id: 'settings', label: 'Configurações', icon: 'settings', route: '/settings' }
        ];
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Track active route
        this.router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (event) {
            _this.activeRoute = event.url;
        });
    };
    SidebarComponent.prototype.isActive = function (route) {
        return this.activeRoute === route;
    };
    SidebarComponent.prototype.navigate = function (route) {
        this.router.navigate([route]);
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            imports: [common_1.CommonModule, logo_component_1.LogoComponent, router_1.RouterLink],
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
