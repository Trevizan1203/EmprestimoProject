import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmprestimosFront';
}
