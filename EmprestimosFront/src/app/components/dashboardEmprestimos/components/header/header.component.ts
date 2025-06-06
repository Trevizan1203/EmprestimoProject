import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClienteModel} from '../../../../models/cliente-model';
import {ClienteService} from '../../../../services/API/cliente.service';
import {EmprestimoModel} from '../../../../models/emprestimo-model';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmprestimoService} from '../../../../services/API/emprestimo.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  clienteId: number = 0;
  cliente!: ClienteModel;
  emprestimos: EmprestimoModel[] = [];
  mostrarForms: boolean = false;
  emprestimoForm: FormGroup;

  constructor(private notificationService: NotificationService, private router: Router, private clienteService: ClienteService, private route: ActivatedRoute, private formBuilder: FormBuilder, private emprestimoService: EmprestimoService) {
    this.clienteId = +this.route.snapshot.paramMap.get('id')!;
    this.emprestimoForm = formBuilder.group({
      id: [null],
      clienteId: [this.clienteId],
      moeda: ['', Validators.required],
      valorObtido: [null, [Validators.required, Validators.min(1)]],
      dataEmprestimo: ['', Validators.required],
      dataVencimento: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.clienteService.getClienteById(this.clienteId).subscribe(data => {
      this.cliente = data;
    })
  }

  isDataInvalida(): boolean {
    const dataEmprestimo = this.emprestimoForm.get('dataEmprestimo')?.value;
    const dataVencimento = this.emprestimoForm.get('dataVencimento')?.value;

    return dataVencimento <= dataEmprestimo;
  }

  voltarParaCadastro() {
    this.router.navigate(['/dashboard']);
  }

  exibeForms() {
    this.mostrarForms = !this.mostrarForms;
  }

  onSubmit() {
    if(this.emprestimoForm.valid) {
      this.emprestimoService.createEmprestimo(this.emprestimoForm.value).subscribe({
        next: () => {
          this.notificationService.showToast("Emprestimo feito.", 'success', true)
        },
        error: (err) => this.notificationService.showToast(err, 'warning')
      })
    } else {
      this.notificationService.showToast("Preencha todos os campos corretamente", 'warning')
    }

  }
}
