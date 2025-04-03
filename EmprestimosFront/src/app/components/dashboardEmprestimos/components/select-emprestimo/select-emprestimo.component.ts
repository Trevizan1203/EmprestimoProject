import {Component, OnInit} from '@angular/core';
import {EmprestimoModel} from '../../../../models/emprestimo-model';
import {EmprestimoService} from '../../../../services/API/emprestimo.service';
import {ActivatedRoute} from '@angular/router';
import {ClienteService} from '../../../../services/API/cliente.service';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-select-emprestimo',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-emprestimo.component.html',
  styleUrl: './select-emprestimo.component.css',
})
export class SelectEmprestimoComponent implements OnInit {
  clienteId: number = 0;
  emprestimos: EmprestimoModel[] = [];
  editForm: FormGroup;

  constructor(private emprestimoService: EmprestimoService, private route: ActivatedRoute, private clienteService: ClienteService, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      moeda: ['', Validators.required],
      valorObtido: ['', [Validators.required, Validators.min(1)]],
      dataEmprestimo: ['', Validators.required],
      dataVencimento: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.clienteId = +this.route.snapshot.paramMap.get('id')!;
    this.clienteService.getClienteEmprestimos(this.clienteId).subscribe(data => {
      this.emprestimos = data;
    });
  }

  isDataInvalida(): boolean {
    const dataEmprestimo = this.editForm.get('dataEmprestimo')?.value;
    const dataVencimento = this.editForm.get('dataVencimento')?.value;

    return !dataEmprestimo || !dataVencimento || dataVencimento <= dataEmprestimo;
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

  editarEmprestimo(emprestimo: EmprestimoModel) {
    emprestimo.editing = !emprestimo.editing;
    if (emprestimo.editing) {
      this.editForm.patchValue({
        moeda: emprestimo.moeda,
        valorObtido: emprestimo.valorObtido,
        dataEmprestimo: emprestimo.dataEmprestimo,
        dataVencimento: emprestimo.dataVencimento
      });
    }
  }

  salvarEdicao(emprestimo: EmprestimoModel) {
    if(this.editForm.invalid) {
      alert("Preencha todos os campos corretamente.");
    } else {
      Object.assign(emprestimo, this.editForm.value);
      console.log(emprestimo);
      this.emprestimoService.updateEmprestimo(emprestimo).subscribe({
        next: () => {
          alert("Emprestimo atualizado com sucesso!");
          emprestimo.editing = !emprestimo.editing;
          this.editForm.reset();
          window.location.reload();
        },
        error: (err) => alert(err.message)
      });
    }

  }

}
