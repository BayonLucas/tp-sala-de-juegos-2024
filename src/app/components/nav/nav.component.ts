import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  authenticator = inject(AuthService);
  router = inject(Router);

  CerrarSesion(){
    this.authenticator.singOutUser().then(() => this.router.navigateByUrl('/home'));
  }

  ngOnInit(): void {
    this.authenticator.user$.subscribe( user => {
      if(user){
        this.authenticator.currentUser.set({
          uid: user.uid,
          email: user.email!,
          nombrecompleto: user.displayName!,
          // contraseña: ""
        });
      }
      else{
        this.authenticator.currentUser.set(null);
      }
    });
  
  }
}
