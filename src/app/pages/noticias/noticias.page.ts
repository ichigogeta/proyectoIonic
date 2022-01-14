import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  constructor() { }

  ngOnInit() 
  {
    $(".contenidoNotificaciones").css("display","none");
    $("#noticias").css("color", "black");
    $("#notificaciones").css("color", "grey");
    $(".contenedor").css("display","none");
    $(".contenedorUno").css("display","none");
  }

  notificaciones(){
    $(".contenidoNotificaciones").css("display","block");
    $("#noticias").css("color", "grey");
    $("#notificaciones").css("color", "black");
    $(".contenedor").css("display","block");
    $(".contenedor").css("display","flex");
    $(".contenedor").css("flex-direction","column");
    $(".contenedor").css("justify-content","center");
    $(".contenedor").css("align-items","center");
    $(".contenedor").css("border","2px solid rgb(149, 149, 149)");
    $(".contenedor").css("padding","10px");
    $(".contenedor").css("border-radius","25px");
    $(".contenedor").css("margin-left","10%");
    $(".contenedor").css("margin-right","10%");
    $(".contenedor").css("position","relative");
    $(".contenedor").css("top","4%");

    $(".contenedorUno").css("display","flex");
    $(".contenedorUno").css("flex-direction","column");
    $(".contenedorUno").css("justify-content","center");
    $(".contenedorUno").css("align-items","center");
    $(".contenedorUno").css("border","2px solid blue");
    $(".contenedorUno").css("padding","10px");
    $(".contenedorUno").css("border-radius","25px");
    $(".contenedorUno").css("margin-left","10%");
    $(".contenedorUno").css("margin-right","10%");
    $(".contenedorUno").css("position","relative");
    $(".contenedorUno").css("top","4%");
    $(".contenedorUno>img").css("position","relative");
    $(".contenedorUno>img").css("right","45%");
    $(".contenedorUno>img").css("width","3%");
    $(".contenedorUno>ion-label").css("text-align","center");
    $('.contenedorDos').css("display","none");
    $(".content").css("display","none");
  }

  noticias(){
    $(".contenidoNotificaciones").css("display","none");
    $("#noticias").css("color", "black");
    $("#notificaciones").css("color", "grey");
    $(".contenedor").css("display","none");
    $(".contenedorUno").css("display","none");

    $(".content").css("display","flex");
    $(".content").css("flex-direction","column");
    $(".content").css("justify-content","center");
    $(".content").css("align-items","center");
    $(".content").css("border","2px solid rgb(149, 149, 149)");
    $(".content").css("padding","10px");
    $(".content").css("border-radius","25px");
    $(".content").css("margin-left","10%");
    $(".content").css("margin-right","10%");
    $(".content").css("position","relative");
    $(".content").css("top","4%");

    $(".contenedorDos").css("display","flex");
    $(".contenedorDos").css("flex-direction","column");
    $(".contenedorDos").css("justify-content","center");
    $(".contenedorDos").css("align-items","center");
    $(".contenedorDos").css("border","2px solid blue");
    $(".contenedorDos").css("padding","10px");
    $(".contenedorDos").css("border-radius","25px");
    $(".contenedorDos").css("margin-left","10%");
    $(".contenedorDos").css("margin-right","10%");
    $(".contenedorDos").css("position","relative");
    $(".contenedorDos").css("top","4%");
    $(".contenedorDos>img").css("position","relative");
    $(".contenedorDos>img").css("right","45%");
    $(".contenedorDos>img").css("width","3%");
    $(".contenedorDos>ion-label").css("text-align","center");
  }

}
