import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../../store/action'; 
import { selectIsSubmitting } from '../../store/reducers';
import { AuthStateInterface } from '../../type/authState.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  LoginForm = this.fb.nonNullable.group({ 
    email: ['', [Validators.required, Validators.email] ],
    password: ['', Validators.required ]
  })

  isSubmitting$ = this.store.select(selectIsSubmitting)
  constructor(private fb: FormBuilder, private store: Store<AuthStateInterface>, private authService: AuthService) {}

  onSubmit():void{
    console.log(this.LoginForm.getRawValue())
     this.store.dispatch(authActions.loginAction({request: this.LoginForm.getRawValue()}))
     this.authService.login(this.LoginForm.getRawValue()).subscribe((res) => {
       console.log(res)
     })
  }
}
