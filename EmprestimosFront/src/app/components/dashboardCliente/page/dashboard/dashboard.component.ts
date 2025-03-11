import { Component } from '@angular/core';
import {RegisterComponent} from '../../components/register/register.component';
import {SelectClientComponent} from '../../components/select-client/select-client.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RegisterComponent,
    SelectClientComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
