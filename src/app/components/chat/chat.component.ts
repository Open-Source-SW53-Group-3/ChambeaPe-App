import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { LoginService } from 'src/app/services/user/login/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  /* */

  chatSelected: any;
  nuevoMensaje: string = '';
  userId !: number;
  mensajes: any[] = [];
  chats: any;
  user: any;

  constructor(loginService: LoginService, private chatService: ChatService) {
    this.user = loginService.getUser();
    this.userId = this.user.id;

    chatService.getChatsByUserId(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.chats = data;
      },
      (error) => {
        console.log(error);
      }
    );

    //this.cargarMensajes(this.chatsv1[0].messages);


    console.log("Estoy en el chat");
    console.log(this.user);
    console.log(this.userId);
    console.log(this.chats);
  }

  ngOnInit() {
    this.scrollToTheLastMessage();
  }

  classSeleted(mensaje: any): any {
    if (this.userId == mensaje.sendById) {
      console.log('enviado');
      console.log(mensaje.sendById);
      return 'enviado';
    } 
    else {
      return 'recibido';
    }
  }

  cargarMensajes(mensajes: any) {
    console.log(`Cargando mensajes`);
    console.log(mensajes);
    this.mensajes = mensajes;

    console.log(this.mensajes[0].content);
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim().length === 0) {
      return;
    }

    console.log(this.nuevoMensaje);

    let mensaje: Message = {
      emisor: this.userId,
      mensaje: this.nuevoMensaje,
    };

    this.mensajes.push(mensaje);
    this.nuevoMensaje = '';

    setTimeout(() => {
      //Espera a que se renderice el mensaje
      this.scrollToTheLastMessage();
    }, 15);
  }

  scrollToTheLastMessage() {
    let elements = document.getElementsByClassName('msg');
    let lastElement: any = elements[elements.length - 1];
    let toppos = lastElement.offsetTop;

    const messagesArea = document.getElementById('messages-area');
    if (messagesArea) {
      messagesArea.scrollTop = toppos;
    }
  }

  convertLinksToHtml(text: string): string {
    // Expresión regular para encontrar URLs en el texto
    const urlPattern = /https?:\/\/[^\s]+/g;

    // Reemplazar cada URL con un enlace HTML
    const textWithImages = text.replace(urlPattern, (url) => {
      if (/\.(jpeg|jpg|gif|png)$/.test(url)) {
        // Si la URL termina en una extensión de imagen, mostrarla como imagen con estilos en línea
        return `<img src="${url}" width="100%" height="auto" " />`;
      } else {
        // De lo contrario, mostrarla como enlace
        return `<a href="${url}" target="_blank">${url}</a>`;
      }
    });

    return textWithImages;
  }

}

interface Message {
  emisor: number;
  mensaje: string;
}
