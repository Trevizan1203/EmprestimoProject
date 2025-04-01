import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-container-right',
  imports: [
    CommonModule
  ],
  templateUrl: './container-right.component.html',
  styleUrl: './container-right.component.css'
})
export class ContainerRightComponent {
  @Input()
  isRegister: boolean = false;
  @Output()
  loginClicked = new EventEmitter<void>();

  alternaLogin() {
    this.loginClicked.emit()
  }
}
