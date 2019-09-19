import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public loading:HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private toast: Toast,
    private storage:Storage) { }

  /**
   * Guarda el código de idioma en el dispositivo
   * @param lang Código de idioma ('es' o 'en' por ejemplo)
   */
  public saveLang(lang: string) {
    return new Promise((resolve, reject) => {
      this.storage.set('lang', lang).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      })
    })
  }

  /**
   * Devuelve el código de idioma guardado en el dispositivo
   */
  public getLang(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.get('lang').then(lang => {
        if (lang) {
          resolve(lang);
        }
        else {
          resolve('es');
        }
      }).catch(error => {
        reject(error);
      })
    })
  }

  /**
   * Cierra la sesión borrando todos los datos del usuario actual
   */
  public closeSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.remove('userData').then(() => {
          resolve();
        }).catch(error => {
          reject('Error al borrar datos de sesión');
        })
      }).catch(error => {
        reject('Error al obtener tus datos');
      })
    })
  }

  /**
   * Muestra loading
   * @param message Mensaje del loading (opcional)
   */
  async showLoading(message?: string, duration?: number) {
    this.loading= await this.loadingCtrl.create({
      message: message ? message : null,
      duration: duration ? duration : null
    });
    return this.loading.present();
  }

  /**
   * Quita el loading cargado
   */
  async dismissLoading() {
    return this.loading.dismiss();
  }

  /**
   * Devuelve el sistema operativo del dispositivo
   */
  public getPlatform() {
    return this.platform.is('ios') ? 'ios' : 'android';
  }

  /**
   * Devuelve el nombre del archivo pasado (incluida la extensión)
   * @param path Ruta del archivo
   */
  public getFileName(path: string) {
    return path.split('/').pop();
  }

  /**
   * Devuelve la extensión del archivo pasado
   * @param path Ruta del archivo
   */
  public getFileExtension(path: string) {
    return path.split('.').pop().toLowerCase();
  }

  /**
   * Muestra un alert genérico para notificar algo (un error, éxito, etc)
   * @param title Título del alert
   * @param message Mensaje del alert
   */
  public async showAlert(title: string, message: string) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    alert.present();
  }

  /**
   * Muestra un toast genérico para notificar algo (un error, éxito, etc)
   * @param message Mensaje del toast
   */
  public showToast(message: string) {
    let duration='5000';
    this.toast.show(message, duration, 'center').subscribe();
  }

  public capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}