"use strict";
// src/app/core/utils/helpers.ts
exports.__esModule = true;
exports.translatePriority = exports.generateId = void 0;
/**
 * Gera uma string de ID pseudo-única.
 */
function generateId() {
    // Combina timestamp e um número aleatório
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
exports.generateId = generateId;
/**
 * Traduz a prioridade de inglês para português para exibição.
 */
function translatePriority(priority) {
    var translations = {
        'High': 'Alta',
        'Medium': 'Média',
        'Low': 'Baixa'
    };
    return translations[priority] || priority;
}
exports.translatePriority = translatePriority;
