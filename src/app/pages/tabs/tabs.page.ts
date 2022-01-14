import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public pages = [
    { tab: 'concursos', name: 'Concursos', icon: 'search' },
    { tab: 'profile', name: 'Perfil', icon: 'person' },
    { tab: 'noticias', name: 'Noticias', icon: 'alert' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
