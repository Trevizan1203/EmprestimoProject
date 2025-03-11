import {Component, OnInit} from '@angular/core';
import {EmprestimoModel} from '../../../models/emprestimo-model';
import {EmprestimoService} from '../../../services/emprestimo.service';
import {ActivatedRoute} from '@angular/router';
import {ClienteService} from '../../../services/cliente.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-select-emprestimo',
  imports: [CommonModule],
  templateUrl: './select-emprestimo.component.html',
  styleUrl: './select-emprestimo.component.css'
})
export class SelectEmprestimoComponent implements OnInit {
  clienteId: number = 0;
  emprestimos: EmprestimoModel[] = [];

  constructor(private emprestimoService: EmprestimoService, private route: ActivatedRoute, private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.clienteId = +this.route.snapshot.paramMap.get('id')!;
    this.clienteService.getClienteEmprestimos(this.clienteId).subscribe(data => {
      this.emprestimos = data;
    });
  }

  toggleCollapse(emprestimo: EmprestimoModel) {
    emprestimo.expandido = !emprestimo.expandido;
  }

  deletarEmprestimo(id: number) {
    if(confirm("Tem certeza que deseja cancelar esse emprestimo?")) {
      this.emprestimoService.deleteEmprestimo(id).subscribe({
        next: () => {
          alert("Emprestimo cancelado com sucesso!");
          window.location.reload();
        },
        error: (err) => alert(err.message),
      })
    }
  }

}
