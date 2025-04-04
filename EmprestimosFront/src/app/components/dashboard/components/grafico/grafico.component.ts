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

  readonly coresStatus = ['#0061cf', '#1bff00', '#ff0000'];

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
    this.emprestimoService.getEmprestimosInfo().subscribe({
      next: data => {
        this.contaStatus(data)
        console.log(this.quantidadeStatus)
        this.doughnutChartDatasets = [
          { data: this.quantidadeStatus, backgroundColor:this.coresStatus, label: 'Status' },
          { data: this.quantidadeValor, backgroundColor:this.coresStatus.map(color => `${color}95`), label: 'Valor' },
          ]
        },
      error: error => this.notificationService.showToast(error, 'danger')
    })
  }

  public doughnutChartLabels: string[] = [ 'Em Andamento', 'Pagos', 'Atrasados' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
}
