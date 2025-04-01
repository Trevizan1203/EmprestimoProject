import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-container-left',
  imports: [
    CommonModule
  ],
  templateUrl: './container-left.component.html',
  styleUrl: './container-left.component.css'
})
export class ContainerLeftComponent {
  @Input()
  isRegister: boolean = false;
  @Output()
  loginClicked = new EventEmitter<void>();

  alternaLogin() {
    this.loginClicked.emit()
  }
}
