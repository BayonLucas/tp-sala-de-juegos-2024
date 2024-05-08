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
        Validators.maxLength(15),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$")
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
        .catch(e => {
          // Muestra el mensaje de error si el registro falla
          switch (e.code) {
            case "auth/invalid-email":
              this.errorMessage = "Email invalido";
              break;
            case "auth/email-already-in-use":
              this.errorMessage = "Email ya en uso";
              break;
            default:
              this.errorMessage = e.code
              break;
          }
        });
    }
  }
}