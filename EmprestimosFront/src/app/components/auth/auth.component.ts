import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContainerLeftComponent} from './container-left/container-left.component';
import {ContainerRightComponent} from './container-right/container-right.component';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    ContainerLeftComponent,
    ContainerRightComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isRegister: boolean = true;

  constructor() {
  }

  alternaLogin() {
    this.isRegister = !this.isRegister;
  }
}
