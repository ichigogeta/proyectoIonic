import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/models/User';

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
    private apiService:ApiService,
    private utilitiesService:UtilitiesService,
    private menuCtrl:MenuController) { }

  public ngOnInit():void {
    this.menuCtrl.enable(false);
    this.form=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  public submitForm():void{
    this.apiService.login(this.form.value).subscribe((user:User)=>{
      console.log('Usuario=>',user);
      this.utilitiesService.showToast('Login correcto');
      //Ahora aplicamos la cabecera devuelta a las siguientes peticiones
      this.apiService.setToken(user.api_token);
    },(error)=>{
      this.utilitiesService.showToast('Error al loguearse');
      console.log('Error al loguearse',error);
    });
  }

}
