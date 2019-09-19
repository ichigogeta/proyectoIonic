import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private apiService:ApiService,
    private menuCtrl:MenuController) { }

  public ngOnInit():void{
    this.menuCtrl.enable(true)
  }

}
