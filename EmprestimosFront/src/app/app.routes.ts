import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboardCliente/page/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {
  DashboardEmprestimoComponent
} from './components/dashboardEmprestimos/page/dashboard-emprestimo/dashboard-emprestimo.component';
import {AuthComponent} from './components/auth/auth.component';
import {guardAutenticacaoGuard} from './guards/guard-autenticacao.guard';
import {PageComponent} from './components/dashboard/components/page/page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [guardAutenticacaoGuard]},
  {path: 'dashboard/:id/emprestimo', component: DashboardEmprestimoComponent, canActivate: [guardAutenticacaoGuard]},
  {path: 'info', component: PageComponent, canActivate: [guardAutenticacaoGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppModule { }
