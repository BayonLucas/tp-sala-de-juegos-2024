import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, CommonModule, RouterLink
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
// export class SingupComponent implements OnInit{
//   fb = inject(FormBuilder);
//   authF = inject(AuthService);
//   router = inject(Router);
//   form: FormGroup = new FormGroup({
//     fullname: new FormControl(''),
//     email: new FormControl(''),
//     password: new FormControl(''),
//   });




//   errorMessage: string | null = null;

//   Registrar(){
//     const data = this.form.getRawValue();
//     console.log(data);
//     this.authF.registerUser(data.email, data.fullname, data.password);
//   }

//   ngOnInit(): void {
//     this.form = this.fb.nonNullable.group({
//       fullname: ['', [
//         Validators.required
//       ]],
//       email: ['', [
//         Validators.required, 
//         Validators.email
//       ]], 
//       password: ['', [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
//       ]]  
//     });
//   }
// }
export class SingupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });  
  errorMessage: string | null = null;



  constructor(
    private fb: FormBuilder,
    private authF: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]], 
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
        Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!-_])[A-Za-z\d!-_]{8,}$")
      ]]  
    });
  }

  ngOnInit(): void {}

  Registrar(){
    debugger;
    if (this.form.valid) {
      const data = this.form.getRawValue();
      console.log(data);
      this.authF.registerUser(data.email, data.fullname, data.password)
        .then(() => {
          // Navega a la página de inicio después de registrarse con éxito
          this.router.navigate(['/home']);
        })
        .catch(error => {
          // Muestra el mensaje de error si el registro falla
          this.errorMessage = error.message;
        });
    }
  }
}