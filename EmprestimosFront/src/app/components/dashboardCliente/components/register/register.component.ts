import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClienteService} from '../../../../services/API/cliente.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  clientesForm: FormGroup;
  @Output()
  release: EventEmitter<void> = new EventEmitter();

  freeToolbar() {
    this.release.emit()
  }

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService) {
    this.clientesForm = this.formBuilder.group({
      id: [null],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(11), Validators.pattern('^[0-9]{10,11}$')]],
    })
  }

  onSubmit() {
    if(this.clientesForm.valid) {
      this.clienteService.registerCliente(this.clientesForm.value).subscribe({
        next: () => {
          alert('Cliente criado com sucesso!');
          window.location.reload();
        },
        error: (err) => alert(err),
      });
    }
  }

}
