import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { confirmPassword } from 'src/app/utils/utils';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { User } from 'src/app/models/User';
import { codeErrors } from "../../utils/utils";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService,
    private navCtrl: NavController) { }

  public ngOnInit(): void {

    this.menuCtrl.enable(false);

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', [Validators.required, confirmPassword]]
    });

  }

  public submitForm(): void {
    this.utilitiesService.showLoading("Registrando usuario...");

    this.apiService.register(this.form.value).subscribe((user: User) => {
      
      this.utilitiesService.dismissLoading();

      this.utilitiesService.showToast('Registro correcto');

      this.navCtrl.navigateRoot('/login');

    }, (error) => {
      
      this.utilitiesService.dismissLoading();
      this.utilitiesService.showToast(codeErrors(error));

    });
  }


}
