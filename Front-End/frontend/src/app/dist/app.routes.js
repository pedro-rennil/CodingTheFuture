"use strict";
exports.__esModule = true;
exports.routes = void 0;
// Guards
var auth_guard_1 = require("./core/guards/auth.guard");
// Components
var login_component_1 = require("./features/login/login.component");
var dashboard_component_1 = require("./features/dashboard/dashboard.component");
var enhanced_backlog_panel_component_1 = require("./features/backlog-panel/enhanced-backlog-panel/enhanced-backlog-panel.component");
var settings_view_component_1 = require("./features/settings/jira-config/settings-view.component");
exports.routes = [
    // Rota de Login (Acesso Público)
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    // Rotas Protegidas (Exigem Login)
    {
        path: '',
        // Aplica o guarda de rota:
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: 'backlog',
                component: enhanced_backlog_panel_component_1.EnhancedBacklogPanelComponent
            },
            {
                path: 'settings',
                component: settings_view_component_1.SettingsViewComponent
            },
        ]
    },
    // Rota Curinga 
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
