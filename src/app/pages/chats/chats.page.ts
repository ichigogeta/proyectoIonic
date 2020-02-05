import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { AlertController, Events } from '@ionic/angular';
import { Chat } from 'src/app/models/Chat';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  public chats: Chat[] = [];

  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,
    private alertCtrl: AlertController,
    private events: Events,
    private ngZone: NgZone) { }

  public ionViewDidEnter(): void {
    this.getChats();

  }

  public ngOnInit(): void {
    this.events.subscribe('add-mensaje', (mensaje) => {
      this.ngZone.run(() => {
        this.chats = this.chats.map(x => {
          if (x.id == mensaje.corral_id) {
            x.mensajes_nuevos += 1;
            x.descripcion = mensaje.texto;
          }
          return x;
        });
      })
    });
  }
  public getChats(): void {
    this.apiService.getEntity('corrales').subscribe((chats: Chat[]) => {
      this.utilities.dismissLoading();
      this.chats = chats.map(x => {

        if (x.ultimo_mensaje)
          x.descripcion = x.ultimo_mensaje.texto;
        else
          x.descripcion = "Sin mensajes aún";

        if (x.ultimo_mensaje)
          x.ultimo_mensaje = x.ultimo_mensaje.created_at;
        else
          x.ultimo_mensaje = Date.now();
        return x;
      }
      );
    }, error => {
      console.log(error);
      this.utilities.showToast("No se pueden obtener los chats");
    });
  }

  public async salirseChat(chat: Chat) {
    const alert = await this.alertCtrl.create({
      header: 'Borrar chat',
      message: '¿Quieres borrar el chat ' + chat.nombre + ' ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.utilities.showLoading("Borrando chat");
            this.apiService.deleteSubEntity('chats', chat.id, 'unirse', 1).subscribe((res) => {
              console.log(res);
              this.utilities.dismissLoading();
              this.getChats();
            }, error => {
              console.log(error);
              this.utilities.dismissLoading();
              this.utilities.showToast("No se ha podido borrar el chat");
            });
          }
        }
      ]
    });

    await alert.present();

  }

}
