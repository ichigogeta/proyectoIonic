/**
 * Variables globales de la aplicación en produccion
 */

//Dominio
const domain = 'http://dominio.com/devxerintel/';

export const environment = {
  production: true,
  
  //Url del endpoint de la api
  apiUrl: domain + '/api/auth/',
  
  //Sender id para las notificaciones push
  senderID:'777777777',

   //Clave de stripe
   stripePublishableKey:'pk_test_***************'
};
