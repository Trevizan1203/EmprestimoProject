import {Component, OnInit} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration} from 'chart.js';
import {EmprestimoService} from '../../../../services/API/emprestimo.service';
import {EmprestimoChartModel} from '../../../../models/emprestimo-chart-model';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-grafico',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css'
})
export class GraficoComponent implements OnInit {
  quantidadeStatus: number[] = [0, 0, 0]
  quantidadeValor: number[] = [0, 0, 0]
  //0 para em andamento, 1 para pago, 2 para atrasado

  constructor(private emprestimoService: EmprestimoService, private notificationService: NotificationService) {
  }

  contaStatus(data: EmprestimoChartModel[]) {
    data.forEach(emprestimo => {
      switch (emprestimo.status) {
        case 'andamento':
          this.quantidadeStatus[0]++;
          this.quantidadeValor[0]+= emprestimo.valorFinal
          break;
        case 'pago':
          this.quantidadeStatus[1]++;
          this.quantidadeValor[1]+= emprestimo.valorFinal
          break;
        default:
          this.quantidadeStatus[2]++;
          this.quantidadeValor[2]+= emprestimo.valorFinal
      }
    })
  }

  ngOnInit() {
    this.quantidadeStatus.forEach((quantidade) => quantidade = 0)
    this.emprestimoService.getEmprestimosInfo().subscribe({
      next: data => {
        this.contaStatus(data)
        console.log(this.quantidadeStatus)
        this.doughnutChartDatasets = [
          { data: this.quantidadeStatus, label: 'Status' },
          { data: this.quantidadeValor, label: 'Valor' },
          ]
        },
      error: error => this.notificationService.showToast(error, 'danger')
    })
  }

  public doughnutChartLabels: string[] = [ 'Em Andamento', 'Pagos', 'Atrasados' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: this.quantidadeStatus, label: 'Status'},
    { data: [ 350, 450, 100 ], label: 'Series A' },
    { data: [ 50, 150, 120 ], label: 'Series B' }
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true
  };
}
