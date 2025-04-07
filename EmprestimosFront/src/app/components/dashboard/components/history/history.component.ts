import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {EmprestimoService} from '../../../../services/API/emprestimo.service';
import {ClienteService} from '../../../../services/API/cliente.service';
import {EmprestimoChartModel} from '../../../../models/emprestimo-chart-model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  @Input()
  emprestimos: EmprestimoChartModel[] = []
  constructor(private emprestimoService: EmprestimoService, private clienteService: ClienteService) {
  }


}
