import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { MenuController, NavController, Events } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { codeErrors } from "../../utils/utils";
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private events: Events,
    private auth: AuthenticationService) {

  }

  public ngOnInit(): void {
    this.menuCtrl.enable(false);

    this.form = this.formBuilder.group({
      email: ['info@xerintel.es', [Validators.required, Validators.email]],
      password: ['xeripassword', Validators.required]
    });
  }

  public submitForm(): void {
    this.utilitiesService.showLoading("Entrando...");

    this.apiService.login(this.form.value).subscribe((user: User) => {

      this.utilitiesService.dismissLoading();
      console.log(user);

      //Ahora aplicamos la cabecera devuelta a las siguientes peticiones
      this.apiService.setTokenToHeaders(user.api_token);

      //Emitimos el evento de login
      this.events.publish('user:login');

      //Vamos a inicio
      this.auth.login(user.api_token);

    }, (error) => {
      this.utilitiesService.dismissLoading();
      this.utilitiesService.showToast(codeErrors(error));
    });
  }

}
