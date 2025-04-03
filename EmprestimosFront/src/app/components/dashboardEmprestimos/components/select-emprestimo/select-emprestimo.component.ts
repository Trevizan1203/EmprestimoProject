import {Component, OnInit} from '@angular/core';
import {EmprestimoModel} from '../../../../models/emprestimo-model';
import {EmprestimoService} from '../../../../services/API/emprestimo.service';
import {ActivatedRoute} from '@angular/router';
import {ClienteService} from '../../../../services/API/cliente.service';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NotificationService} from '../../../../services/notification.service';

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

  constructor(private notificationService: NotificationService, private emprestimoService: EmprestimoService, private route: ActivatedRoute, private clienteService: ClienteService, private formBuilder: FormBuilder) {
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
          this.notificationService.showToast("Emprestimo cancelado com sucesso.", 'success', true)
        },
        error: (err) => this.notificationService.showToast(err, 'warning')
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
      this.notificationService.showToast("Preencha todos os campos corretamente", 'warning')
    } else {
      Object.assign(emprestimo, this.editForm.value);
      console.log(emprestimo);
      this.emprestimoService.updateEmprestimo(emprestimo).subscribe({
        next: () => {
          this.notificationService.showToast("Emprestimo atualizado com sucesso.", 'success', true)
          emprestimo.editing = !emprestimo.editing;
          this.editForm.reset();
        },
        error: (err) => this.notificationService.showToast(err, 'warning')
      });
    }

  }

}
