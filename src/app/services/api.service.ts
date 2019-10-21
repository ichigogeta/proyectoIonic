import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../models/User';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public userChanges = new Subject<User>();
  public httpOptions: any;

  constructor(public http: HttpClient,
    private utilities:UtilitiesService,
    private storage:Storage) { }

  /**
   * Método para iniciar sesión
   * @param email 
   * @param password 
   */
  public login(user: User) {
    return this.http.post<User>(environment.apiUrl + 'login', user);
  }

  /**
   * Método para el registro básico
   * @param user 
   */
  public register(user: User) {
    return this.http.post(environment.apiUrl + 'signup', user);
  }

  /**
   * Método para recuperar contraseña
   * @param email 
   */
  public forgotPassword(email: string) {
    return this.http.post(environment.apiUrl + 'forgot-password', email);
  }

  /**
   * Método para añadir el bearer token a las cabeceras 
   */
  public setTokenToHeaders(token: string): void {

    //Asignar token a las siguientes peticiones
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Guardamos el token de sesion en el storage
   */
  public setTokenStorage(token: string): void {
    //Guardamos el token en el storage
    this.storage.set('api_token', token);
  }

  /**
   * Devolvemos el token del storage 
   */
  public getTokenStorage() {
    return this.storage.get('api_token');
  }


  /**
   * Método para obtener los datos del usuario
   */
  public getUser(): any {
    return this.http.get<User>(environment.apiUrl + 'user', this.httpOptions);
  }

  /**
   * Método para actualizar los datos del usuario
   * @param user 
   */
  public updateUser(user: User): any {
    this.userChanges.next(user);
    return this.http.post<User>(environment.apiUrl + 'update-user', user, this.httpOptions);
  }

  /**
   * Método para obtener las traducciones
   */
  public getTranslations() {
    return this.http.get(environment.apiUrl + 'traducciones', this.httpOptions);
  }

  /**
   * Guardar el token del dispositivo en el servidor
   * @param tokenRegistro 
   */
  public guardarTokenDeRegistro(tokenRegistro) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('registerToken', tokenRegistro);
    urlSearchParams.append('platform', this.utilities.getPlatform());
    return this.http.post(environment.apiUrl + 'guardar-token', urlSearchParams, this.httpOptions);
  }

  // ====================== Métodos añadidos ==========================


}
