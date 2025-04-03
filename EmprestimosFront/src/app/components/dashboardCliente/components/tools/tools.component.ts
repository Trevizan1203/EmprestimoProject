import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tools',
  imports: [],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {
  @Output()
  cliente: EventEmitter<void> = new EventEmitter();
  @Output()
  user: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {
  }

  areaCliente() {
    this.cliente.emit();
  }

  areaUser() {
    this.user.emit();
  }

  logout() {
    this.router.navigateByUrl('');
  }
}
