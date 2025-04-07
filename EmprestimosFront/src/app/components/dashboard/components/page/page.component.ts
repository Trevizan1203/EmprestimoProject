import { Component } from '@angular/core';
import {GraficoComponent} from '../graficos/pizza/grafico.component';
import {HeaderComponent} from '../header/header.component';
import {BarraComponent} from '../graficos/barra/barra.component';
import {BarraFuturaComponent} from '../graficos/barra-futura/barra-futura.component';

@Component({
  selector: 'app-page',
  imports: [
    GraficoComponent,
    HeaderComponent,
    BarraComponent,
    BarraFuturaComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}
