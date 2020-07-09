import { Component, OnInit } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { User } from './models/User';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { environment } from "../environments/environment";
import { Stripe } from '@ionic-native/stripe/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  user: User;

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
    private router: Router) {
  }

  /**
   * Nos suscribimos a los cambios dle perfil
   */
  public ngOnInit(): void {
    //this.pushNotifications();
    //this.prepararStripe();
    this.auth.authenticationState.subscribe(state => {
      console.log(state);
      if (state) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['cover-page']);
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
