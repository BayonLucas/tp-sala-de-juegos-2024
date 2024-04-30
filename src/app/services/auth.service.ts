import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, user, User, authState } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  user$ = user(this.auth);
  userState$ = authState(this.auth);

  currentUser = signal<UserInterface | null | undefined>(undefined)
  
  async registerUser(email: string, username: string, password: string){
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then( response => 
        updateProfile(response.user, {displayName: username})
      ).catch(e =>{
        throw e;
      });
  }

  async loginUser(email: string, password: string){
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async resetPassword(email: string){
    return await sendPasswordResetEmail(this.auth, email);
  }

  async singOutUser(){
    return await signOut(this.auth);
  }

  getUserLogged() {
    return this.userState$;
  }



}
