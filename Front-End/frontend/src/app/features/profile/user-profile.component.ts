import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

interface ProfileData {
  name: string;
  email: string;
  company: string;
  sector: string;
  phone: string;
  location: string;
  role: string;
  department: string;
  joinDate: string;
  bio: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: []
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isEditing = false;
  activeTab = 0; // 0: Perfil, 1: Preferências, 2: Segurança

  profileData: ProfileData = {
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    company: 'Tech Solutions Ltda',
    sector: 'Tecnologia da Informação',
    phone: '+55 11 98765-4321',
    location: 'São Paulo, Brasil',
    role: 'Product Manager',
    department: 'Desenvolvimento',
    joinDate: 'Janeiro 2023',
    bio: 'Gerente de produtos com experiência em metodologias ágeis e integração de sistemas.'
  };

  preferences = {
    language: 'pt-BR',
    theme: 'light',
    notifications: true,
    emailAlerts: true,
    weeklyReport: false
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.authService.userName$.subscribe(name => {
      if (name) {
        this.profileData.name = name;
      }
    });

    this.initForm();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      name: [this.profileData.name, [Validators.required, Validators.minLength(3)]],
      email: [this.profileData.email, [Validators.required, Validators.email]],
      phone: [this.profileData.phone, [Validators.minLength(10)]],
      location: [this.profileData.location],
      company: [this.profileData.company],
      sector: [this.profileData.sector],
      role: [this.profileData.role],
      department: [this.profileData.department],
      bio: [this.profileData.bio]
    });
  }

  get initials(): string {
    return this.profileData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  startEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.profileForm.reset(this.profileData);
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.profileData = { ...this.profileData, ...this.profileForm.value };
      this.isEditing = false;
      this.toastService.success('Perfil atualizado com sucesso!');
    } else {
      this.toastService.error('Por favor, corrija os erros no formulário');
    }
  }

  onPreferenceChange(key: string, value: any): void {
    this.preferences = { ...this.preferences, [key]: value };
    this.toastService.success('Preferência atualizada!');
  }

  changePassword(): void {
    this.toastService.info('Funcionalidade em desenvolvimento');
  }

  setup2FA(): void {
    this.toastService.info('Funcionalidade em desenvolvimento');
  }
}
