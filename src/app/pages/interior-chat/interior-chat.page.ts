import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActivatedRoute } from '@angular/router';
import { Events } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Mensaje } from 'src/app/models/Mensaje';

@Component({
  selector: 'app-interior-chat',
  templateUrl: './interior-chat.page.html',
  styleUrls: ['./interior-chat.page.scss'],
})
export class InteriorChatPage implements OnInit {

  @ViewChild('content', null) private content: any;

  public mensajeActual: Mensaje;
  public mensajes: Mensaje[];
  public idChat: number;
  public nombreChat: string;
  public ultimoMensaje;
  public escribiendo: boolean;
  public escribiendoUser: string;

  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
    private events: Events,
    private ngZone: NgZone,
    private camera: Camera) {

    this.route.params.subscribe(params => {
      console.log(params);

      this.idChat = params.id_chat;
      this.nombreChat = params.nombre_chat;
      this.ultimoMensaje = params.ultimo_mensaje;
    })

  }

  public ngOnInit(): void {
    this.mensajeActual = {
      texto: "",
      created_at: Date.now(),
      chat_id: this.idChat
    }
    this.getMensajes();
    this.events.subscribe('add-mensaje', (mensaje) => {
      this.ngZone.run(() => {
        let m: Mensaje = {
          id: mensaje.id,
          texto: mensaje.texto,
          user_name: mensaje.user_name,
          created_at: mensaje.created_at,
          urlImagen: mensaje.urlImagen,
          avatar: mensaje.avatar,
        }
        console.log("mensaje", m);
        this.escribiendo = true;
        this.escribiendoUser = m.user_name;
        setTimeout(() => {
          this.escribiendo = false;
          this.ultimoMensaje = m.created_at;
          this.mensajes.push(m);
          this.content.scrollToBottom(300);
        }, 1000);

      })
    });
  }

  public getMensajes(): void {
    this.utilities.showLoading();
    this.apiService.getSubEntity('chats', this.idChat, 'mensajes').subscribe((mensajes: Mensaje[]) => {
      this.utilities.dismissLoading();
      this.mensajes = mensajes;
      setTimeout(() => {
        this.content.scrollToBottom(1000);
      }, 200);
    }, error => {
      this.utilities.dismissLoading();
      console.log(error);
      this.utilities.showToast("No se pueden obtener los mensajes");
    });
    this.apiService.deleteEntity('mensajesNuevos', this.idChat).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

  public publicarMensaje() {
    if (this.mensajeActual.texto != "" || this.mensajeActual.imagen) {
      let mensaje: Mensaje = {
        texto: this.mensajeActual.texto,
        created_at: this.mensajeActual.created_at,
        chat_id: this.idChat,
        imagen: this.mensajeActual.urlImagen,
      }
      this.ultimoMensaje = mensaje.created_at;
      this.mensajes.push(mensaje);

      this.apiService.addSubEntity('chats', this.idChat, 'mensajes', mensaje).subscribe((mensaje: Mensaje) => {

      }, error => {
        console.log(error);
      });

      this.mensajeActual.texto = "";
      this.mensajeActual.urlImagen = null;


      this.content.scrollToBottom(300);
    }
  }

  /**
   * Cambiar imagen de perfil
   */
  public adjuntarImagen(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1920,
      targetHeight: 1080,
      allowEdit: false
    }
    this.camera.getPicture(options).then((urlFoto) => {
      let base64img = 'data:image/jpeg;base64,' + urlFoto;
      this.mensajeActual.urlImagen = base64img;
      console.log(urlFoto);
    }).catch(error => {
      this.utilities.showAlert('Error al obtener imagen', error);
    })
  }

  public borrarImagen(): void {
    console.log('Imagen borrada');
    this.mensajeActual.imagen = null;
    this.mensajeActual.urlImagen = null;
  }

}
