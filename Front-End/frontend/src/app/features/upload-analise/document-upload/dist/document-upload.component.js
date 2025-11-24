"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocumentUploadComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var DocumentUploadComponent = /** @class */ (function () {
    function DocumentUploadComponent() {
        // ENTRADAS (Recebe do AppComponent - Lógica de UI do App.tsx)
        this.isAnalyzing = false;
        this.progress = 0;
        this.isComplete = false;
        this.viewingDocumentName = null;
        // SAÍDAS (Emite para o AppComponent - Substitui o 'handleAnalyze')
        this.fileUpload = new core_1.EventEmitter();
        this.viewLastDocument = new core_1.EventEmitter();
        this.selectedFile = null;
    }
    // Função que lida com a seleção de arquivo
    DocumentUploadComponent.prototype.onFileSelected = function (event) {
        var file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    };
    // Função que emite o arquivo para o AppComponent
    DocumentUploadComponent.prototype.startAnalysis = function () {
        if (this.selectedFile) {
            this.fileUpload.emit(this.selectedFile);
        }
    };
    __decorate([
        core_1.Input()
    ], DocumentUploadComponent.prototype, "isAnalyzing");
    __decorate([
        core_1.Input()
    ], DocumentUploadComponent.prototype, "progress");
    __decorate([
        core_1.Input()
    ], DocumentUploadComponent.prototype, "isComplete");
    __decorate([
        core_1.Input()
    ], DocumentUploadComponent.prototype, "viewingDocumentName");
    __decorate([
        core_1.Output()
    ], DocumentUploadComponent.prototype, "fileUpload");
    __decorate([
        core_1.Output()
    ], DocumentUploadComponent.prototype, "viewLastDocument");
    DocumentUploadComponent = __decorate([
        core_1.Component({
            selector: 'app-document-upload',
            standalone: true,
            imports: [common_1.CommonModule],
            templateUrl: './document-upload.component.html',
            styleUrls: ['./document-upload.component.css']
        })
    ], DocumentUploadComponent);
    return DocumentUploadComponent;
}());
exports.DocumentUploadComponent = DocumentUploadComponent;
