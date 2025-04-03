import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserModel} from '../../../../models/user-model';

@Component({
  selector: 'app-edit-user',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario: UserModel = {
    id: 0,
    username: '',
    password: '',
    email: ''
  }
  @Output()
  release: EventEmitter<void> = new EventEmitter();

  freeToolbar() {
    this.release.emit()
  }

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      id: [null],
      username: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (data: UserModel) => {
        this.usuario = data;
        this.usuarioForm.patchValue(data);
      },
      error: error => {console.log(error)},
      }
    )
  }

  onSubmit() {

  }
}
