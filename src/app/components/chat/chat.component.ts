import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';
import { Observable, switchMap } from 'rxjs';
import { MensajeModel } from '../../models/mensaje';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  auth = inject(AuthService);
  store = inject(StoreService);
  messages$!: Observable<MensajeModel[]>;
  userIsLogged: any;
  showChat = false;
  userName: any;
  message = '';
  messages: MensajeModel[] = [];

  @ViewChild('container-messages') private messageContainer!: ElementRef;
  
  

  ngOnInit(): void {
    this.auth.user$.subscribe(
      user => {
        this.userIsLogged = user;
        this.userName = user?.displayName;
        this.messages$ = this.store.cargarMensajes();
        
        this.messages$.subscribe(
          (messages: MensajeModel[]) => {
            this.messages = messages;
            setTimeout(() => {
              this.scrollToBottom();
            }, 5);
          },
          (error) => {
            console.error('Error obteniendo documentos: ', error);
          }
        );
    });
  } 
  
    enviarMensajes(): void {
      const now = new Date();
      const messageNew: MensajeModel = {
        uid: this.userIsLogged.uid,
        user: this.userName,
        text: this.message,
        date: now.toLocaleString(),
      };
    
      this.store.guardarMensajes(messageNew);
      this.messages.push(messageNew);
    
      setTimeout(() => {
        this.message = "";
        this.scrollToBottom();
      }, 10);
    }
    
    determineMessageClass(message: MensajeModel): string {
      return message.uid === this.userIsLogged.uid ? 'send' : 'received';
    }
    scrollToBottom() {
      const containerMessages = document.getElementById("container-messages");
      if (containerMessages) {
        const toppos = containerMessages.scrollHeight;
        containerMessages.scrollTop = toppos;
      }
    }

}
