import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {SelectEmprestimoComponent} from '../../components/select-emprestimo/select-emprestimo.component';

@Component({
  selector: 'app-dashboard-emprestimo',
  imports: [
    HeaderComponent,
    SelectEmprestimoComponent
  ],
  templateUrl: './dashboard-emprestimo.component.html',
  styleUrl: './dashboard-emprestimo.component.css'
})
export class DashboardEmprestimoComponent {

}
