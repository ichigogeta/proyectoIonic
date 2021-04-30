import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { User } from '../models/User';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public userChanges = new Subject<User>();
  public httpOptions: any;

  constructor(
    public http: HttpClient,
    private utilities: UtilitiesService
  ) { }

  /**
   * Hace una petición GET al dominio asociado de la aplicación para comprobar si está o no suspendido.
   * **IMPORTANTE**: En el archivo `src/environments/environment.ts`, debe establecerse correctamente la propiedad `domainUrl`
   */
  public checkAppDomain(): Observable<any> {
    return this.http.get(environment.domainUrl, { responseType: 'text' });
  }

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

  public removeTokenToHeaders(): void {
    this.httpOptions = null;
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
   * Guardar el token del dispositivo en el servidor firebase
   * @param tokenRegistro 
   */
  public guardarTokenDeRegistro(tokenRegistro) {
    return this.http.post(environment.apiUrl + 'guardar-token', { registerToken: tokenRegistro, platform: this.utilities.getPlatform() }, this.httpOptions);
  }

  /**
 * Método para procesar el pago stripe
 */
  public procesarPago(params: { precio: number, stripeToken?: any }): any {

    return this.http.post(environment.apiUrl + 'pago', params, this.httpOptions);
  }


  // ====================== Métodos API RESTFUL ==========================


  // Como obtener los productos por ejemplo:
  // this.apiService.getEntity('productos').subscribe((productos:Productos)=>{console.log(productos)});


  // ====================== Obtener entidades ================================

  public getEntity(entity: string, id?: number): any {
    if (id)
      return this.http.get(environment.apiUrl + entity + '/' + id, this.httpOptions);
    else
      return this.http.get(environment.apiUrl + entity, this.httpOptions);
  }

  public getSubEntity(entity: string, idEntity: number, subEntity: string, idSubEntity?: number): any {
    if (idSubEntity)
      return this.http.get(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity + '/' + idSubEntity, this.httpOptions);
    else
      return this.http.get(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity, this.httpOptions);
  }

  public getSubSubEntity(entity: string, idEntity: number, subEntity: string, idSubEntity: number, subSubEntity: string, idSubSubEntity?: number): any {
    if (idSubSubEntity)
      return this.http.get(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity + '/' + idSubEntity + '/' + subSubEntity + '/' + idSubSubEntity, this.httpOptions);
    else
      return this.http.get(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity + '/' + idSubEntity + '/' + subSubEntity, this.httpOptions);
  }


  // ====================== Añadir entidades ================================


  public addEntity(entity: string, params: any): any {
    return this.http.post(environment.apiUrl + entity, params, this.httpOptions);
  }

  public addSubEntity(entity: string, idEntity: number, subEntity: string, params?: any): any {
    return this.http.post(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity, params, this.httpOptions);
  }

  public addSubSubEntity(entity: string, idEntity: number, subEntity: string, idSubEntity: number, subSubEntity: string, params?: any): any {
    return this.http.post(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity + '/' + idSubEntity + '/' + subSubEntity, params, this.httpOptions);
  }


  // ====================== Borrar entidades ================================


  public deleteEntity(entity: string, id: number): any {
    return this.http.delete(environment.apiUrl + entity + '/' + id, this.httpOptions);
  }

  public deleteSubEntity(entity: string, idEntity: number, subEntity: string, idSubEntity: number): any {
    return this.http.delete(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity + '/' + idSubEntity, this.httpOptions);
  }

  public deleteSubSubEntity(entity: string, idEntity: number, subEntity: string, idSubEntity: number, subSubEntity: string, idSubSubEntity: number): any {
    return this.http.delete(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity + '/' + idSubEntity + '/' + subSubEntity + '/' + idSubSubEntity, this.httpOptions);
  }


  // ====================== Actualizar entidades ================================


  public updateEntity(entity: string, id: number, params: any): any {
    return this.http.put(environment.apiUrl + entity + '/' + id, params, this.httpOptions);
  }

  public updateSubEntity(entity: string, idEntity: number, subEntity: string, idSubEntity: number, params: any): any {
    return this.http.put(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity + '/' + idSubEntity, params, this.httpOptions);
  }

  public updateSubSubEntity(entity: string, idEntity: number, subEntity: string, idSubEntity: number, subSubEntity: string, params: any): any {
    return this.http.put(environment.apiUrl + entity + '/' + idEntity + '/' + subEntity + '/' + idSubEntity + '/' + subSubEntity, params, this.httpOptions);
  }
}
