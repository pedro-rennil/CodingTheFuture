"use strict";
// src/app/core/data/mock-data.ts
exports.__esModule = true;
exports.MOCK_DOCUMENT_CONTENT = exports.MOCK_TASKS = void 0;
// Exportação principal para a lista de tarefas
exports.MOCK_TASKS = [
    {
        id: '1',
        title: 'Implementar sistema de autenticação de usuário',
        description: 'Criar fluxo de autenticação seguro com tokens JWT, incluindo login, logout e gerenciamento de sessão.',
        type: 'Story',
        priority: 'High',
        storyPoints: 8,
        estimatedHours: 24,
        estimatedTime: 24,
        status: 'To Do',
        documentSource: 'Especificação Projeto.pdf',
        dueDate: new Date(2025, 11, 28),
        assignedTo: 'Backend Team'
    },
    {
        id: '2',
        title: 'Design de menu de navegação responsivo',
        description: 'Construir componente de navegação mobile-friendly que se adapta a diferentes tamanhos de tela.',
        type: 'Task',
        priority: 'Medium',
        storyPoints: 3,
        estimatedHours: 8,
        estimatedTime: 8,
        status: 'In Progress',
        documentSource: 'Guia de Migração.md',
        dueDate: new Date(2025, 11, 25),
        assignedTo: 'Frontend Team'
    },
    {
        id: '3',
        title: 'Configurar schema e migrações do banco de dados',
        description: 'Definir tabelas, relacionamentos e criar scripts de migração inicial.',
        type: 'Task',
        priority: 'High',
        storyPoints: 5,
        estimatedHours: 16,
        estimatedTime: 16,
        status: 'Blocked',
        documentSource: 'Especificação Projeto.pdf',
        dueDate: new Date(2025, 11, 29),
        assignedTo: 'DevOps'
    },
    {
        id: '8',
        title: 'Escrever testes unitários para endpoints da API',
        description: 'Criar cobertura de testes abrangente para todos os endpoints REST API.',
        type: 'Task',
        priority: 'Low',
        storyPoints: 3,
        estimatedHours: 12,
        estimatedTime: 12,
        status: 'Done',
        documentSource: 'Documentação QA.txt',
        dueDate: new Date(2025, 12, 10),
        assignedTo: 'QA Team'
    },
];
// Exportação do conteúdo do documento mockado
exports.MOCK_DOCUMENT_CONTENT = "Especifica\u00E7\u00E3o de Requisitos do Sistema\n\n1. INTRODU\u00C7\u00C3O\nEste documento descreve os requisitos funcionais e n\u00E3o-funcionais para o desenvolvimento de um sistema de gerenciamento de tarefas com integra\u00E7\u00E3o de IA.\n\n2. REQUISITOS FUNCIONAIS\n2.1 Autentica\u00E7\u00E3o e Autoriza\u00E7\u00E3o: O sistema deve implementar um mecanismo de autentica\u00E7\u00E3o seguro utilizando tokens JWT.\n2.2 Interface do Usu\u00E1rio: A interface deve ser responsiva e adaptar-se a diferentes tamanhos de tela.\n2.3 Gerenciamento de Banco de Dados: Implementar schema de banco de dados relacional.\n\n// ... restante do seu conte\u00FAdo de documento ...\n";
