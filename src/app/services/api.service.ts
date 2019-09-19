import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../models/User';

import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public userChanges = new Subject<User>();
  public httpOptions: any;

  constructor(public http: HttpClient) {}

  /**
   * Método para iniciar sesión
   * @param email 
   * @param password 
   */
  public login(user:User) {
    return this.http.post<User>(environment.apiUrl + 'login', user);
  }

  /**
   * Método para el registro básico
   * @param user 
   */
  public register(user:User) {
    return this.http.post(environment.apiUrl + 'signup', user);
  }

  /**
   * Método para añadir el bearer token a las cabeceras
   */
  public setToken(tokenInfo:any): void {
    //Asignar token a las siguientes peticiones
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenInfo.access_token}`
      })
    };
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

  // ====================== Métodos añadidos ==========================


}
