import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: []
})
export class SettingsViewComponent implements OnInit {
  jiraForm!: FormGroup;
  aiForm!: FormGroup;
  
  isJiraConnected = false;
  isAiConnected = false;

  aiProviders = {
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

  selectedProvider = 'openai';

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.jiraForm = this.fb.group({
      url: ['', [Validators.required, this.urlValidator]],
      project: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      apiToken: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.aiForm = this.fb.group({
      provider: ['openai', Validators.required],
      model: ['gpt-4', Validators.required],
      apiKey: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  urlValidator(control: any) {
    const value = control.value;
    if (!value) return null;
    
    const isValid = value.startsWith('http://') || value.startsWith('https://');
    return isValid ? null : { invalidUrl: true };
  }

  onJiraSubmit(): void {
    if (this.jiraForm.valid) {
      this.isJiraConnected = true;
      this.toastService.success('Conectado ao Jira com sucesso!');
    } else {
      this.toastService.error('Por favor, preencha todos os campos obrigatórios');
    }
  }

  onAiSubmit(): void {
    if (this.aiForm.valid) {
      this.isAiConnected = true;
      const provider = this.aiForm.value.provider;
      this.toastService.success(`Conectado ao ${this.aiProviders[provider as keyof typeof this.aiProviders].name} com sucesso!`);
    } else {
      this.toastService.error('Por favor, preencha todos os campos obrigatórios');
    }
  }

  onProviderChange(provider: string): void {
    this.selectedProvider = provider;
    const defaultModel = this.aiProviders[provider as keyof typeof this.aiProviders].models[0];
    this.aiForm.patchValue({ model: defaultModel });
  }

  get availableModels(): string[] {
    return this.aiProviders[this.selectedProvider as keyof typeof this.aiProviders].models;
  }

  get providerKeyUrl(): string {
    return this.aiProviders[this.selectedProvider as keyof typeof this.aiProviders].keyUrl;
  }
}
