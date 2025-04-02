import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Token} from '@angular/compiler';
import {TokenModel} from '../../../models/token-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-container-right',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './container-right.component.html',
  styleUrl: './container-right.component.css'
})
export class ContainerRightComponent {
  @Input()
  isRegister: boolean = false;
  @Output()
  loginClicked = new EventEmitter<void>();

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      id: [null],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    sessionStorage.clear()
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (response: String) => {
          let res: TokenModel
          res = JSON.parse(JSON.stringify(response));
          sessionStorage.setItem('token', res.acessToken)
          this.router.navigateByUrl('/dashboard');
        },
        error: err => {
          console.log(err)
          alert('Credenciais Inválidas.')
        }
      })
    }
  }

  alternaLogin() {
    this.loginClicked.emit()
  }
}
