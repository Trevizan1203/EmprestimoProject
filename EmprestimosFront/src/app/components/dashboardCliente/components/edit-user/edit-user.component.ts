import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
  @Output()
  release: EventEmitter<void> = new EventEmitter();
  changePassword: boolean = false;

  freeToolbar() {
    this.release.emit()
  }

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: [''],
      newPassword: ['', Validators.minLength(6)],
      confirmedPassword: ['', Validators.minLength(6)]
    });
  }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (data: UserModel) => {
        this.usuarioForm.patchValue(data);
      },
      error: error => {console.log(error)},
      }
    )
  }

  onSubmit() {
    this.userService.update(this.usuarioForm.value).subscribe({
      next: () => {
        alert("Usuário alterado com sucesso.")
        window.location.reload();
      },
      error: error =>  alert(error)
      }
    )
  }
}
