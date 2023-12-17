import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store'; 
import { authActions } from '../../store/action';
import { registerRequestInterface } from '../../type/registerRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class RegisterComponent {
  signUpForm = this.fb.nonNullable.group({
    username: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email] ],
    password: ['', Validators.required ]
  })
  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit():void{ 
    let  registerRequest: registerRequestInterface = this.signUpForm.getRawValue()
     this.store.dispatch(authActions.registerAction({request:registerRequest}))
  }
}
