import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmprestimoService} from '../../../../../services/API/emprestimo.service';
import {EmprestimoChartModel} from '../../../../../models/emprestimo-chart-model';
import {NotificationService} from '../../../../../services/notification.service';
import {ChartConfiguration} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-barra',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './barra.component.html',
  styleUrl: './barra.component.css'
})
export class BarraComponent implements OnInit {
  valoresMeses: number[] = [0, 0, 0, 0];
  meses: number[] = [0, 0, 0, 0];
  //0: atual, 1: -1mes, 2: -2mes...

  constructor(private emprestimoService: EmprestimoService, private notificationService: NotificationService) {
    let hoje = new Date();

    this.emprestimoService.getEmprestimosInfo().subscribe({
      next: (data: EmprestimoChartModel[]) => {
        data.forEach(emprestimo => {
          let data = new Date(emprestimo.dataEmprestimo)

          const calcularIndiceMes = (mes: number) => {
            if (mes < 0) {
              return 12 + mes;
            }
            return mes;
          };

          switch (calcularIndiceMes(data.getMonth())) {
            case hoje.getMonth():
              this.valoresMeses[3] += emprestimo.valorObtido;
              break;
            case hoje.getMonth() - 1:
              this.valoresMeses[2] += emprestimo.valorObtido;
              break;
            case hoje.getMonth() - 2:
              this.valoresMeses[1] += emprestimo.valorObtido;
              break;
            case hoje.getMonth() - 3:
              this.valoresMeses[0] += emprestimo.valorObtido;
              break;
          }
        });
      },
      error: error => this.notificationService.showToast(error, 'danger')
    });
    this.barChartData.datasets[0].data = this.valoresMeses;
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: "blue",
        label: 'Valor Total Emprestado (R$)',
        borderColor: "blue",
        borderWidth: 1
      }
    ],
    labels: ['Mês Anterior ao Retrasado', 'Mês Retrasado', 'Mês Passado', 'Mês Atual']
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        title: { display: true, text: 'Valor Emprestado (R$)' },
        beginAtZero: true
      }
    }
  };

  ngOnInit() {
    this.barChartData.datasets[0].data = this.valoresMeses;
  }

}
