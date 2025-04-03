import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../services/API/user.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-container-left',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './container-left.component.html',
  styleUrl: './container-left.component.css'
})
export class ContainerLeftComponent {
  @Input()
  isRegister: boolean = false;
  @Output()
  loginClicked = new EventEmitter<void>();

  registerForm: FormGroup;

  constructor(private notificationService: NotificationService, private formBuilder: FormBuilder, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      id: [null],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    sessionStorage.clear()
  }

  onSubmit(): void {
    if(this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: () => {
          this.notificationService.showToast("Usuario cadastrado com sucesso.", 'success')
          this.alternaLogin()
          this.registerForm.reset()
        },
        error: (err) => {
          this.notificationService.showToast(err, 'warning')
        }
      })
    }
  }

  alternaLogin() {
    this.loginClicked.emit()
  }
}
