"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var logo_component_1 = require("../../shared/components/logo/logo.component");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, authService, toastService) {
        this.fb = fb;
        this.authService = authService;
        this.toastService = toastService;
        this.loginForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.onSubmit = function () {
        if (this.loginForm.valid) {
            var _a = this.loginForm.value, email = _a.email, password = _a.password;
            this.authService.login(email, password);
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, logo_component_1.LogoComponent],
            styleUrls: []
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
