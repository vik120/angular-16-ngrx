import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, catchError } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { authActions } from '../../store/action'; 
import { selectAuthResult, selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
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

  data$ = combineLatest({
    isSubmitting$: this.store.select(selectIsSubmitting),
    backendError: this.store.select(selectValidationErrors),
    getAuthResult$: this.store.select(selectAuthResult)
  })

  
  constructor(private fb: FormBuilder, private store: Store<AuthStateInterface>, private authService: AuthService, private toastr: ToastrService) {
    setTimeout(() => {
      this.data$ && this.data$.subscribe((res:any) => {
        res.backendError && this.toastr.error(res.backendError.message)
        if(res.getAuthResult$) {
          this.store.dispatch(authActions.getCurrentUserAction())
        }
      })
    }, 400)
  }

  onSubmit():void{
    console.log(this.LoginForm.getRawValue())
     this.store.dispatch(authActions.loginAction({request: this.LoginForm.getRawValue()}))
     
  }
}
