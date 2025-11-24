"use strict";
// src/app/shared/components/document-viewer/document-viewer.component.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocumentViewerComponent = void 0;
var core_1 = require("@angular/core");
var DocumentViewerComponent = /** @class */ (function () {
    function DocumentViewerComponent() {
        // ENTRADAS
        this.fileName = '';
        this.fileContent = '';
        // SAÍDAS
        this.onClose = new core_1.EventEmitter();
        // ESTADO INTERNO (useState do React)
        this.zoom = 100;
        this.annotations = [];
        this.selectedText = '';
        this.showAnnotationDialog = false;
        this.currentAnnotation = '';
        this.editingAnnotation = null;
        // A lógica handleTextSelection e handleAddAnnotation deve ser implementada aqui, 
        // usando o estado interno (this.selectedText, this.annotations).
    }
    DocumentViewerComponent.prototype.handleZoomIn = function () {
        if (this.zoom < 200)
            this.zoom += 10;
    };
    DocumentViewerComponent.prototype.handleZoomOut = function () {
        if (this.zoom > 50)
            this.zoom -= 10;
    };
    __decorate([
        core_1.Input()
    ], DocumentViewerComponent.prototype, "fileName");
    __decorate([
        core_1.Input()
    ], DocumentViewerComponent.prototype, "fileContent");
    __decorate([
        core_1.Output()
    ], DocumentViewerComponent.prototype, "onClose");
    DocumentViewerComponent = __decorate([
        core_1.Component({
            selector: 'app-document-viewer',
            standalone: true,
            templateUrl: './document-viewer.component.html'
        })
    ], DocumentViewerComponent);
    return DocumentViewerComponent;
}());
exports.DocumentViewerComponent = DocumentViewerComponent;
