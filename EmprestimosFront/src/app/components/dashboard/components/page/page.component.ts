import { Component } from '@angular/core';
import {GraficoComponent} from '../grafico/grafico.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-page',
  imports: [
    GraficoComponent,
    HeaderComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}
