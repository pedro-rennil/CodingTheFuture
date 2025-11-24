"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadAnaliseComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var helpers_1 = require("../../core/utils/helpers"); // Assume que este helper existe
var UploadAnaliseComponent = /** @class */ (function () {
    function UploadAnaliseComponent(fb, documentService, toastService) {
        this.fb = fb;
        this.documentService = documentService;
        this.toastService = toastService;
        this.selectedFile = null;
        this.isAnalyzing = false;
        this.analysisProgress = 0;
        this.viewingDocumentName = null;
    }
    UploadAnaliseComponent.prototype.ngOnInit = function () {
        // Inicializa o formulário reativo com um controle obrigatório para o arquivo
        this.uploadForm = this.fb.group({
            documentFile: [null, forms_1.Validators.required]
        });
    };
    UploadAnaliseComponent.prototype.onFileSelected = function (event) {
        var _a;
        var input = event.target;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            this.viewingDocumentName = null;
            // Atribui o nome do arquivo ao form control para passar na validação
            (_a = this.uploadForm.get('documentFile')) === null || _a === void 0 ? void 0 : _a.setValue(this.selectedFile.name);
        }
    };
    UploadAnaliseComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.uploadForm.invalid || !this.selectedFile) {
            this.toastService.error('Selecione um arquivo para análise.', 'Erro de Upload');
            return;
        }
        this.isAnalyzing = true;
        this.analysisProgress = 0;
        var fileName = this.selectedFile.name;
        var documentId = helpers_1.generateId();
        // 1. Simular barra de progresso
        this.progressInterval = setInterval(function () {
            if (_this.analysisProgress < 95) {
                _this.analysisProgress += 5;
            }
        }, 150);
        // 2. Chamar o serviço que simula a análise (e adiciona tarefas ao TaskService)
        this.documentService.simulateDocumentAnalysis(fileName, documentId)
            .pipe(
        // Finalize garante que o intervalo seja limpo, mesmo em erro
        operators_1.finalize(function () {
            clearInterval(_this.progressInterval);
            _this.isAnalyzing = false;
        }))
            .subscribe({
            next: function () {
                _this.analysisProgress = 100;
                _this.viewingDocumentName = fileName;
                _this.toastService.success('Análise de IA concluída! Tarefas adicionadas ao backlog.', 'Sucesso');
                _this.uploadForm.reset(); // Limpa o formulário
                _this.selectedFile = null;
                // Reseta a barra de progresso após um pequeno delay visual
                setTimeout(function () { return _this.analysisProgress = 0; }, 500);
            },
            error: function (err) {
                _this.toastService.error('Falha na análise. Tente novamente.', 'Erro de Serviço');
                _this.viewingDocumentName = null;
            }
        });
    };
    UploadAnaliseComponent = __decorate([
        core_1.Component({
            selector: 'app-upload-analise',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            templateUrl: './upload-analise.component.html',
            styleUrls: ['./upload-analise.component.scss']
        })
    ], UploadAnaliseComponent);
    return UploadAnaliseComponent;
}());
exports.UploadAnaliseComponent = UploadAnaliseComponent;
