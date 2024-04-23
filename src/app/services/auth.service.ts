import { ParseSourceFile } from '@angular/compiler';
import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, user, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  user$ = user(this.auth);

  
  async registerUser(email: string, username: string, password: string){
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then( response => 
        updateProfile(response.user, {displayName: username}),
      );


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

  // async getProfile(){
  //   return await 
  // }



}
