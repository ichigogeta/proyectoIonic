/**
 * Variables globales de la aplicación en local
 */

//Nombre de la aplicación
const appName = 'personalizacion-laravel/public';

export const environment = {
  production: false,

  //Url del endpoint de la api
  apiUrl: 'http://localhost/' + appName + '/api/auth/',
  
  //Sender id para las notificaciones push
  senderID:'777777777'
};
