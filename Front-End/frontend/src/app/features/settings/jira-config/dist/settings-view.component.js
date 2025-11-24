"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SettingsViewComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var SettingsViewComponent = /** @class */ (function () {
    function SettingsViewComponent(fb, toastService) {
        this.fb = fb;
        this.toastService = toastService;
        this.isJiraConnected = false;
        this.isAiConnected = false;
        this.aiProviders = {
            openai: {
                name: 'OpenAI',
                models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
                keyUrl: 'https://platform.openai.com/api-keys'
            },
            anthropic: {
                name: 'Anthropic (Claude)',
                models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
                keyUrl: 'https://console.anthropic.com/'
            },
            langchain: {
                name: 'LangChain',
                models: ['default'],
                keyUrl: ''
            },
            azure: {
                name: 'Azure OpenAI',
                models: ['gpt-4', 'gpt-35-turbo'],
                keyUrl: ''
            }
        };
        this.selectedProvider = 'openai';
    }
    SettingsViewComponent.prototype.ngOnInit = function () {
        this.initForms();
    };
    SettingsViewComponent.prototype.initForms = function () {
        this.jiraForm = this.fb.group({
            url: ['', [forms_1.Validators.required, this.urlValidator]],
            project: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            apiToken: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]]
        });
        this.aiForm = this.fb.group({
            provider: ['openai', forms_1.Validators.required],
            model: ['gpt-4', forms_1.Validators.required],
            apiKey: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]]
        });
    };
    SettingsViewComponent.prototype.urlValidator = function (control) {
        var value = control.value;
        if (!value)
            return null;
        var isValid = value.startsWith('http://') || value.startsWith('https://');
        return isValid ? null : { invalidUrl: true };
    };
    SettingsViewComponent.prototype.onJiraSubmit = function () {
        if (this.jiraForm.valid) {
            this.isJiraConnected = true;
            this.toastService.success('Conectado ao Jira com sucesso!');
        }
        else {
            this.toastService.error('Por favor, preencha todos os campos obrigatórios');
        }
    };
    SettingsViewComponent.prototype.onAiSubmit = function () {
        if (this.aiForm.valid) {
            this.isAiConnected = true;
            var provider = this.aiForm.value.provider;
            this.toastService.success("Conectado ao " + this.aiProviders[provider].name + " com sucesso!");
        }
        else {
            this.toastService.error('Por favor, preencha todos os campos obrigatórios');
        }
    };
    SettingsViewComponent.prototype.onProviderChange = function (provider) {
        this.selectedProvider = provider;
        var defaultModel = this.aiProviders[provider].models[0];
        this.aiForm.patchValue({ model: defaultModel });
    };
    Object.defineProperty(SettingsViewComponent.prototype, "availableModels", {
        get: function () {
            return this.aiProviders[this.selectedProvider].models;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SettingsViewComponent.prototype, "providerKeyUrl", {
        get: function () {
            return this.aiProviders[this.selectedProvider].keyUrl;
        },
        enumerable: false,
        configurable: true
    });
    SettingsViewComponent = __decorate([
        core_1.Component({
            selector: 'app-settings-view',
            templateUrl: './settings-view.component.html',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            styleUrls: []
        })
    ], SettingsViewComponent);
    return SettingsViewComponent;
}());
exports.SettingsViewComponent = SettingsViewComponent;
