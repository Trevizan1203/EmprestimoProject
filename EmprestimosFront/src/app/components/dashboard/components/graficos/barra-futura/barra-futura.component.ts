import {Component, Input, SimpleChanges} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {NgIf} from "@angular/common";
import {ChartConfiguration} from 'chart.js';
import {EmprestimoService} from '../../../../../services/API/emprestimo.service';
import {NotificationService} from '../../../../../services/notification.service';
import {EmprestimoChartModel} from '../../../../../models/emprestimo-chart-model';

@Component({
  selector: 'app-barra-futura',
    imports: [
        BaseChartDirective,
        NgIf
    ],
  templateUrl: './barra-futura.component.html',
  styleUrl: './barra-futura.component.css'
})
export class BarraFuturaComponent {
  valoresMeses: number[] = [0, 0, 0, 0];
  @Input()
  emprestimos: EmprestimoChartModel[] = []
  carregado: boolean = false
  //0: atual, 1: -1mes, 2: -2mes...

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: "orange",
        label: 'Valor Total à Receber (R$)',
        borderColor: "orange",
        borderWidth: 1
      }
    ],
    labels: ['Mês Atual', 'Próximo Mês', 'Mês Posterior', 'Mês pós-posterior']
  };

  constructor(private emprestimoService: EmprestimoService, private notificationService: NotificationService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['emprestimos']) {
      this.carregado = !this.carregado
      this.valoresMeses = [0,0,0,0]
      this.processarEmprestimos()
    }
  }

  processarEmprestimos() {
    let hoje = new Date();

    this.emprestimos.forEach(emprestimo => {
      if(emprestimo.status == 'pago')
        return
      let data = new Date(emprestimo.dataVencimento)

      const calcularIndiceMes = (mes: number) => {
        return (mes + 12) % 12;
      };

      switch (calcularIndiceMes(data.getMonth())) {
        case hoje.getMonth():
          this.valoresMeses[0] += emprestimo.valorFinal;
          break;
        case hoje.getMonth() + 1:
          this.valoresMeses[1] += emprestimo.valorFinal;
          break;
        case hoje.getMonth() + 2:
          this.valoresMeses[2] += emprestimo.valorFinal;
          break;
        case hoje.getMonth() + 3:
          this.valoresMeses[3] += emprestimo.valorFinal;
          break;
      }
    })
    setTimeout(() => {
      this.barChartData.datasets[0].data = this.valoresMeses;
      this.carregado = true;
    }, 500);
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        title: { display: true, text: 'Valor à Receber (R$)' },
        beginAtZero: true,
      }
    }
  };

}
