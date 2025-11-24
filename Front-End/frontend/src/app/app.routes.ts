import { Routes } from '@angular/router';

// Guards
import { AuthGuard } from './core/guards/auth.guard'; 

// Components
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EnhancedBacklogPanelComponent } from './features/backlog-panel/enhanced-backlog-panel/enhanced-backlog-panel.component';
import { SettingsViewComponent } from './features/settings/jira-config/settings-view.component';

export const routes: Routes = [
  // Rota de Login (Acesso Público)
  { 
    path: 'login', 
    component: LoginComponent 
  },
  
  // Rotas Protegidas (Exigem Login)
  {
    path: '',
    // Aplica o guarda de rota:
    canActivate: [AuthGuard], 
    children: [
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      { 
        path: 'dashboard', 
        component: DashboardComponent 
      },
      { 
        path: 'backlog', 
        component: EnhancedBacklogPanelComponent 
      },
      { 
        path: 'settings', 
        component: SettingsViewComponent 
      },
    ]
  },
  
  // Rota Curinga 
  { 
    path: '**', 
    redirectTo: 'dashboard' 
  }
];