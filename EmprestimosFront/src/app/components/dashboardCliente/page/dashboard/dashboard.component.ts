import { Component } from '@angular/core';
import {RegisterComponent} from '../../components/register/register.component';
import {SelectClientComponent} from '../../components/select-client/select-client.component';
import {ToolsComponent} from '../../components/tools/tools.component';
import {NgClass, NgIf} from '@angular/common';
import {EditUserComponent} from '../../components/edit-user/edit-user.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RegisterComponent,
    SelectClientComponent,
    ToolsComponent,
    NgIf,
    NgClass,
    EditUserComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  client: boolean = false;
  user: boolean = false;
  toolbar: boolean = true;

  alternateToolbar() {
    this.toolbar = !this.toolbar;
    if(this.client == true) {
      this.client = !this.client;
    }
    if(this.user == true) {
      this.user = !this.user;
    }
  }

  creating() {
    this.toolbar = !this.toolbar;
    this.client = !this.client
    if(this.user == true)
      this.user = !this.user;
  }

  editingUser() {
    this.toolbar = !this.toolbar;
    this.user = !this.user
    if(this.client == true)
      this.client = !this.client
  }
}
