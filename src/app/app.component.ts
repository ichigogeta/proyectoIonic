import { Component, OnInit } from '@angular/core';

import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { User } from './models/User';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { environment } from "../environments/environment";
import { Stripe } from '@ionic-native/stripe/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  user: User;
  public isLoading: boolean = true;
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Chats',
      url: '/chats',
      icon: 'chatboxes'
    }
  ];

  constructor(private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiService: ApiService,
    private push: Push,
    private events: Events,
    private stripe: Stripe,
    private auth: AuthenticationService,
    private navCtrl: NavController,
    private storage: Storage) {
  }

  /**
   * Nos suscribimos a los cambios dle perfil
   */
  public ngOnInit(): void {
    this.auth.authenticationState.subscribe(token => {
      if (token != 'logout' && token != '') {
        //this.pushNotifications();
        //this.prepararStripe();
        this.apiService.setTokenToHeaders(token);
        this.navCtrl.navigateRoot('tabs').then(() => {
          this.isLoading = false;
        });
      } else if (token == 'logout') {
        this.apiService.removeTokenToHeaders();
        this.navCtrl.navigateRoot('cover-page').then(() => {
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
        console.log("primera vez");
      }
    });

    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.statusBar.styleBlackOpaque();
        this.splashScreen.hide();
      });
    }

    this.apiService.userChanges.subscribe((user: User) => {
      this.user = user;
    });

  }

  /**
   * Configuración de las notificación push
   */
  public pushNotifications(): void {

    const options: PushOptions = {
      android: {
        senderID: environment.senderID,
        icon: 'notification'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true',
      },
      windows: {},
    }

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      this.events.publish('add-mensaje', notification.additionalData.apiData.mensaje);
    });

    pushObject.on('registration').subscribe((registration: any) => {
      const regId = registration.registrationId;
      this.apiService.guardarTokenDeRegistro(regId).subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  /**
   * Preparamos stripe con su configuración
   */
  public prepararStripe(): void {
    this.stripe.setPublishableKey(environment.stripePublishableKey);
  }

}
