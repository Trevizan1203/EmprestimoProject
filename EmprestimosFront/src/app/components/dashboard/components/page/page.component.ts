import { Component } from '@angular/core';
import {GraficoComponent} from '../graficos/pizza/grafico.component';
import {HeaderComponent} from '../header/header.component';
import {BarraComponent} from '../graficos/barra/barra.component';
import {BarraFuturaComponent} from '../graficos/barra-futura/barra-futura.component';
import {HistoryComponent} from '../history/history.component';
import {EmprestimoChartModel} from '../../../../models/emprestimo-chart-model';
import {EmprestimoService} from '../../../../services/API/emprestimo.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-page',
  imports: [
    GraficoComponent,
    HeaderComponent,
    BarraComponent,
    BarraFuturaComponent,
    HistoryComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  emprestimos: EmprestimoChartModel[] = []
  emprestimosFiltrados: EmprestimoChartModel[] = []

  constructor(private emprestimoService: EmprestimoService, private notificationService: NotificationService) {
    this.emprestimoService.getEmprestimosInfo().subscribe({
      next: data => {
        this.emprestimos = data
        this.emprestimosFiltrados = this.emprestimos
        console.log(this.emprestimosFiltrados)
      },
      error: error => this.notificationService.showToast(error, 'danger')
      }
    )
  }

  aplicarFiltro(filtro: string) {
    switch (filtro) {
      case 'pagos':
        this.emprestimosFiltrados = this.emprestimos.filter(emp => emp.status === 'pago')
        console.log(this.emprestimosFiltrados)
        break;
      case 'andamento':
        this.emprestimosFiltrados = this.emprestimos.filter(emp => emp.status === 'andamento');
        console.log(this.emprestimosFiltrados)
        break;
      case 'atrasados':
        this.emprestimosFiltrados = this.emprestimos.filter(emp => emp.status === 'atrasado');
        console.log(this.emprestimosFiltrados)
        break;
      case '':
        this.emprestimosFiltrados = [...this.emprestimos];  // Reseta para todos
        break;
      default:
        this.emprestimosFiltrados = [...this.emprestimos];
    }
  }
}
