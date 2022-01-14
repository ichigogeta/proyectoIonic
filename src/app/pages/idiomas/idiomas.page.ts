import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.page.html',
  styleUrls: ['./idiomas.page.scss'],
})
export class IdiomasPage implements OnInit {

  constructor(private navCtrl: NavController, private translate: TranslateService,
    private storage: Storage,private router:Router) { }

  ngOnInit() {
  }

  public seleccionarIdioma(idioma: string): void {
    this.translate.setDefaultLang(idioma);
    this.router.navigate(["/login"]);
    this.storage.set("idioma", idioma);

  }

}
