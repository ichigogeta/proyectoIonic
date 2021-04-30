/**
 * Variables globales de la aplicación en local
 */


export const environment = {
  production: false,

  // URL del dominio asociado a la aplicación, para comprobar si está o no suspendido
  domainUrl: 'https://development.xerintel.net/',

  // URL del endpoint de la api de pruebas
  apiUrl: 'https://development.xerintel.net/api/auth/',

  /* apiUrl: 'http://localhost/laravel-base-api/public/api/auth/', */
    
  //Sender id para las notificaciones push
  senderID:'777777777',
  
  //Clave de stripe
  stripePublishableKey:'pk_test_***************'
};
