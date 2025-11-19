import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // 👈 Essencial para [(ngModel)] nos formulários (JiraConfig, Editáveis)
import { HttpClientModule } from '@angular/common/http'; // 👈 Essencial para o AiService

// Componentes Traduzidos (IMPORTANTE: Você deve criar todos estes arquivos!)
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { JiraConfigComponent } from './features/settings/jira-config/jira-config.component';
import { HistoryViewComponent } from './features/history/history-view/history-view.component';
import { HistoryTableComponent } from './features/history/history-table/history-table.component';
import { EnhancedBacklogPanelComponent } from './features/backlog-panel/enhanced-backlog-panel/enhanced-backlog-panel.component';
import { EditableBacklogTableComponent } from './features/backlog-panel/editable-backlog-table/editable-backlog-table.component';
import { DocumentUploadComponent } from './features/upload-analise/document-upload/document-upload.component';
import { DocumentViewerComponent } from './shared/components/document-viewer/document-viewer.component';

// Componentes Faltantes (Para Compilação Inicial, crie arquivos vazios)
import { LoginComponent } from './features/login/login.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { SettingsViewComponent } from './features/settings/settings-view.component';
import { UserProfileComponent } from './features/profile/user-profile.component';
// Adicione qualquer outro componente que você venha a criar (Ex: BacklogTableComponent)


@NgModule({
  declarations: [ // 👈 Array OBRIGATÓRIO para listar todos os seus componentes
    AppComponent,
    HeaderComponent,
    JiraConfigComponent,
    HistoryViewComponent,
    HistoryTableComponent,
    EnhancedBacklogPanelComponent,
    EditableBacklogTableComponent,
    DocumentUploadComponent,
    DocumentViewerComponent,
    LoginComponent,
    SidebarComponent,
    SettingsViewComponent,
    UserProfileComponent
  ],
  imports: [ // 👈 Array OBRIGATÓRIO para módulos Angular
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    // AppRoutingModule deve ser configurado aqui para roteamento
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }