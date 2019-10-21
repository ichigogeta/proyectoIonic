import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { MenuController, NavController, Events } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { codeErrors } from "../../utils/utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public isUpdating: boolean;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private events: Events) {

  }

  public ngOnInit(): void {
    this.menuCtrl.enable(false);

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public submitForm(): void {

    this.apiService.login(this.form.value).subscribe((user: User) => {
      this.utilitiesService.showToast('Login correcto');
      console.log(user);

    //Ahora aplicamos la cabecera devuelta a las siguientes peticiones
    this.apiService.setTokenToHeaders(user.api_token);

    //Emitimos el evento de login
    this.events.publish('user:login');

    //Guardamos el token en el storage
    this.apiService.setTokenStorage(user.api_token);

      //Vamos a inicio
      this.navCtrl.navigateRoot('/home');

    }, (error) => {
      this.utilitiesService.showToast(codeErrors(error));
    });
  }

}
