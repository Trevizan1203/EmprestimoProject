import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboardCliente/page/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {
  DashboardEmprestimoComponent
} from './dashboardEmprestimos/page/dashboard-emprestimo/dashboard-emprestimo.component';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/:id/emprestimo', component: DashboardEmprestimoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppModule { }
