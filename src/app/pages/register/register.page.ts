import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { confirmPassword } from 'src/app/utils/validators';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form:FormGroup;

  constructor(
    private menuCtrl:MenuController,
    private formBuilder:FormBuilder,
    private apiService:ApiService,
    private utilitiesService:UtilitiesService) { }

  public ngOnInit():void {
    this.menuCtrl.enable(false);
     this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', [Validators.required,confirmPassword]]
    });
  }

  public submitForm():void{
    this.apiService.register(this.form.value).subscribe((user:User)=>{
      console.log('Usuario=>',user);
      this.utilitiesService.showToast('Registro correcto');
    },(error)=>{
      this.utilitiesService.showToast('Error al registrarse');
      console.log(error);
    });
  }

}
