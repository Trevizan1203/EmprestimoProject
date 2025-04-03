import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboardCliente/page/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {
  DashboardEmprestimoComponent
} from './components/dashboardEmprestimos/page/dashboard-emprestimo/dashboard-emprestimo.component';
import {AuthComponent} from './components/auth/auth.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/:id/emprestimo', component: DashboardEmprestimoComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppModule { }
