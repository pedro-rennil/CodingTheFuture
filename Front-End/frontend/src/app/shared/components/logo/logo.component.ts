import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type LogoSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: []
})
export class LogoComponent {
  @Input() className = '';
  @Input() showText = false;
  @Input() size: LogoSize = 'md';

  get containerClass(): string {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-16 w-16'
    };
    return sizes[this.size];
  }

  get textClass(): string {
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl'
    };
    return sizes[this.size];
  }
}
