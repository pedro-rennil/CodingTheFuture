// src/app/core/data/mock-data.ts

// Certifique-se de que o modelo Task esteja importado corretamente
import { Task } from '../models/task.model';

// Exportação principal para a lista de tarefas
export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Implementar sistema de autenticação de usuário',
    description: 'Criar fluxo de autenticação seguro com tokens JWT, incluindo login, logout e gerenciamento de sessão.',
    type: 'Story',
    priority: 'High',
    storyPoints: 8,
    estimatedHours: 24,
    estimatedTime: 24, // Usando estimatedTime para o TaskService
    status: 'To Do', // Corrigido para status Kanban
    documentSource: 'Especificação Projeto.pdf', // Campo obrigatório para o fluxo
    dueDate: new Date(2025, 11, 28), // Campo obrigatório
    assignedTo: 'Backend Team', // Campo obrigatório
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
    status: 'In Progress', // Variando o status inicial
    documentSource: 'Guia de Migração.md',
    dueDate: new Date(2025, 11, 25),
    assignedTo: 'Frontend Team',
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
    status: 'Blocked', // Variando o status inicial
    documentSource: 'Especificação Projeto.pdf',
    dueDate: new Date(2025, 11, 29),
    assignedTo: 'DevOps',
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
    status: 'Done', // Variando o status inicial
    documentSource: 'Documentação QA.txt',
    dueDate: new Date(2025, 12, 10),
    assignedTo: 'QA Team',
  },
  // ... Incluir as outras 4 tarefas aqui com campos corrigidos ...
];

// Exportação do conteúdo do documento mockado
export const MOCK_DOCUMENT_CONTENT = `Especificação de Requisitos do Sistema

1. INTRODUÇÃO
Este documento descreve os requisitos funcionais e não-funcionais para o desenvolvimento de um sistema de gerenciamento de tarefas com integração de IA.

2. REQUISITOS FUNCIONAIS
2.1 Autenticação e Autorização: O sistema deve implementar um mecanismo de autenticação seguro utilizando tokens JWT.
2.2 Interface do Usuário: A interface deve ser responsiva e adaptar-se a diferentes tamanhos de tela.
2.3 Gerenciamento de Banco de Dados: Implementar schema de banco de dados relacional.

// ... restante do seu conteúdo de documento ...
`;