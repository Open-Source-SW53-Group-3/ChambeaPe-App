import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  /* */

  chatSelected: any = null;

  chats: any = [
    {
      nombre: 'Soporte técnico',
      estado: 'En línea',
      picture:
        'https://cdn.discordapp.com/attachments/1151660063606448158/1161573307108315229/image-removebg-preview.png?ex=6538ca71&is=65265571&hm=840da4fb7c1ac010fe48e6449d6d1a64b362f489a782683c30f43401fcc5781d&',
      mensajes: [
        {
          emisor: 'soporte_tecnico',
          mensaje:
            'Buenos días, se encuentra en contacto con nuestro equipo de sopore técnico. ¿En qué podemos asistirle hoy?',
        },
        {
          emisor: 'ray_punkeki123',
          mensaje:
            'Hola, quisiera reportar al chambeador Steve por enviarme contenido inapropiado',
        },
        {
          emisor: 'soporte_tecnico',
          mensaje:
            'Esta bien, le enviaremos un mensaje a Steve para que deje de hacerlo y de paso lo enviaremos a Israel :D.',
        },
      ],
    },
    {
      nombre: 'Steve',
      estado: 'En línea',
      picture:
        'https://rcdn.rolloid.net/uploads/2016/08/Las-21-Fotografias-mas-adorables-de-Perros-salchicha-que-hayas-visto-nunca-banner.jpg',
      mensajes: [
        {
          emisor: 'ray_punkeki123',
          mensaje: 'Hola, ¿cómo estás?',
        },
        {
          emisor: 'steve_marvel',
          mensaje: 'Estoy bien y tu?',
        },
        {
          emisor: 'ray_punkeki123',
          mensaje: 'Tambien estoy bien, mañana sale su minecraft',
        },
        {
          emisor: 'steve_marvel',
          mensaje: 'Mirate esto: https://www.youtube.com/watch?v=QH2-TGUlwu4 \n https://peru21.pe/resizer/nsJDbTwZSHlPdLjGTG5AVUVAIVA=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/EJJYL2WSFBGYRITOJ7ASRSGAYI.jpg',
        },
      ],
    },
    {
      nombre: 'Jennifer',
      estado: 'Desconectado',
      picture:
        'https://articles-img.sftcdn.net/f_auto,t_article_cover_xl/auto-mapping-folder/sites/2/2023/05/kitty-the-killer-trailer.jpg',
      mensajes: [],
    },
    {
      nombre: 'Diego Castro',
      estado: 'En línea',
      picture: 'https://i.ytimg.com/vi/lQ9VOgC59yM/maxresdefault.jpg',
      mensajes: [],
    },
  ];

  classSeleted(mensaje: any): any {
    if (this.chatSelected.nombre === 'Soporte técnico') {
      if (this.userId == mensaje.emisor) {
        return 'support-enviado';
      } 
      else {
        return 'support-recibido';
      }
    } 
    else {
      if (this.userId == mensaje.emisor) {
        return 'enviado';
      } 
      else {
        return 'recibido';
      }
    }
  }

  cargarMensajes(chat: any) {
    this.chatSelected = chat;
    console.log(`Cargando mensajes de ${this.chatSelected.nombre}`);
    this.mensajes = this.chatSelected.mensajes;
  }

  /**/
  nuevoMensaje: string = '';
  userId = 'ray_punkeki123';
  mensajes: Message[] = [];

  constructor() {
    this.cargarMensajes(this.chats[0]);
  }

  ngOnInit() {
    this.scrollToTheLastMessage();
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
  emisor: string;
  mensaje: string;
}
