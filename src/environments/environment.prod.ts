/**
 * Variables globales de la aplicación en produccion
 */

export const environment = {
  production: true,
  
  //Url del endpoint de la api
  apiUrl: 'http://localhost/app-laravel/public/api/auth/',

  //apiUrl: 'http://app.xerintel.net/devxerintel/api/auth/',
    
  //Sender id para las notificaciones push
  senderID:'777777777',
  
  //Clave de stripe
  stripePublishableKey:'pk_test_***************'
};
