import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  filtrando: boolean = false
  @Output()
  filtro = new EventEmitter();

  filtraPagos() {
    this.filtro.emit('pagos')
  }
  filtraAbertos() {
    this.filtro.emit('andamento')
  }
  filtraAtrasados() {
    this.filtro.emit('atrasados')
  }
  limpaFiltros() {
    this.filtro.emit('')
  }

  constructor(private router: Router) {
  }

  retornar() {
    this.router.navigate(['/dashboard']);
  }

  trocaFiltrando() {
    this.filtrando = !this.filtrando
  }
}
