import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../../../../services/API/cliente.service';
import {CommonModule} from '@angular/common';
import {ClienteModel} from '../../../../models/cliente-model';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-client.component.html',
  styleUrl: './select-client.component.css'
})
export class SelectClientComponent implements OnInit {
  clientes: ClienteModel[] = [];
  clientesFiltrados: ClienteModel[] = [];
  buscaTermo: String = ''
  clienteEditando: ClienteModel | null = null;
  editForm: FormGroup;

  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder, private router: Router) {
    this.editForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]]
    });
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = data;
      },
      error: (err) => alert(err.message),
    })
  }

  deletarCliente(id: number) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      this.clienteService.deleteClienteById(id).subscribe({
        next: () => {
          alert("Cliente deletado com sucesso!");
          window.location.reload();
        },
          error: (err) => alert(err.message),
      });
    }
  }

  editarCliente(cliente: ClienteModel) {
    cliente.editing = true;
    this.clienteEditando = cliente;
  }

  salvarEdicao(cliente: ClienteModel) {
    this.editForm.patchValue(cliente);
    if (this.editForm.invalid) {
      alert("Por favor, preencha os dados corretamente.");
    } else {
      cliente.editing = false;
      this.clienteService.editClienteById(cliente).subscribe({
        next: () => {
          alert("Cliente atualizado com sucesso!");
          this.clienteEditando = null;
          this.editForm.reset();
          window.location.reload();
        },
        error: (err) => {
          alert(err.message);
          window.location.reload();
        }
      });
    }
  }

  cancelarEdicao(cliente: ClienteModel) {
    cliente.editing = false;
  }

  selecionarCliente(id: number) {
    this.router.navigate([`/dashboard/${id}/emprestimo`])
  }

  filtrarClientes() {
    if (!this.buscaTermo) {
      this.clientesFiltrados = this.clientes;
    } else {
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(this.buscaTermo.toLowerCase())
      )
    }
  }

}
