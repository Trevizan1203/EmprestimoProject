import {Component, OnInit} from '@angular/core';
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
export class HistoryComponent implements OnInit {
  emprestimos: EmprestimoChartModel[] = []
  constructor(private emprestimoService: EmprestimoService, private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.emprestimoService.getEmprestimosInfo().subscribe({
      next: (data) => {
        this.emprestimos = data
      }
    })
  }


}
