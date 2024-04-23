import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {
  fb = inject(FormBuilder);
  authF = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required]], 
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
    ]],  });

  errorMessage: string | null = null;

  Registrar(){
    const data = this.form.getRawValue();
    this.authF.registerUser(data.email, data.fullname, data.password);
  }


}
