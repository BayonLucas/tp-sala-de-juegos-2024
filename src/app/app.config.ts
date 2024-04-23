import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC57sjK-8xFI5SzMcBuQH2hp4mwpx2LLe4",
  authDomain: "tp-sala-de-juegos-2024.firebaseapp.com",
  projectId: "tp-sala-de-juegos-2024",
  storageBucket: "tp-sala-de-juegos-2024.appspot.com",
  messagingSenderId: "118166395301",
  appId: "1:118166395301:web:b96bbd2c28cc4e1cd8b04c"
};
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
