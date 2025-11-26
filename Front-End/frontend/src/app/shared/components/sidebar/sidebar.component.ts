import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LogoComponent } from '../logo/logo.component';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,LogoComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeRoute = '';

  menuItems: MenuItem[] = [
    { id: 'upload', label: 'Upload de Documento', icon: 'upload', route: '/upload' },
    { id: 'backlog', label: 'Backlog Gerado', icon: 'list', route: '/backlog' },
    { id: 'profile', label: 'Perfil do Usuário', icon: 'user', route: '/profile' },
    { id: 'settings', label: 'Configurações', icon: 'settings', route: '/settings' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Track active route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.url;
      });
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}