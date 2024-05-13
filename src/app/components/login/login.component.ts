import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
  fb = inject(FormBuilder);
  authF = inject(AuthService);
  router = inject(Router);
  fStore = inject(StoreService);
  form!: FormGroup;
  errorMessage: string | null = null;
  success: boolean = false;
  
  IniciarSesion(){
    const data = this.form.getRawValue();
    
    this.authF.loginUser(data.email, data.password)
    .then(res => {
      let userCredential: UserModel =  <UserModel>{
        uid: res.user.uid,
        email: res.user.email,
        nombrecompleto: res.user.displayName
      }
      localStorage.setItem("userCredential", JSON.stringify(userCredential))
      this.fStore.guardarLog(res.user.email!);
      this.router.navigateByUrl('/home');
    }).catch(e => {
      //Toast
      console.log(e);
      
    });
  }
  
  CargarUsuario1(){
    this.form.patchValue({
      email: 'knights-code-lks@hotmail.com',
      password: 'Lb123456!!'
    });
  }
  
  CargarUsuario2(){
    this.form.patchValue({
      email: 'testasd@test.com',
      password: 'Asd123!!'
    });
  }

  CargarUsuario3(){
    this.form.patchValue({
      email: 'otrousuariotest@test.com.ar',
      password: 'Asd123!!'
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
}
