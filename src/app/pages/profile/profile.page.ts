import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { confirmPassword, codeErrors } from 'src/app/utils/utils';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: User;
  public form: FormGroup;
  public base64img:string;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private camera:Camera) {

  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['', confirmPassword]
    });

    this.apiService.getUser().subscribe((user: User) => {
      user.avatar=environment.domainUrl+'/storage/'+user.avatar;
      this.user = user;
      
      this.form.patchValue(user);
    });
    this.apiService.userChanges.subscribe((user: User) => {
      this.user = user;
    });
  }

  public submitForm(): void {
    this.apiService.updateUser(this.form.value).subscribe((user: User) => {
      this.user = user;
      this.utilities.showToast('Usuario actualizado correctamente');
    }, (error) => {
      this.utilities.showToast(codeErrors(error));
    });
  }

  /**
  * Cambiar imagen de perfil
  */
  public adjuntarImagen(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1920,
      targetHeight: 1080,
      allowEdit: false
    }
    this.camera.getPicture(options).then((urlFoto) => {
      this.base64img = 'data:image/jpeg;base64,' + urlFoto;
      this.user.avatar = this.base64img;
      console.log(urlFoto);
    }).catch(error => {
      this.utilities.showAlert('Error al obtener imagen', error);
    })
  }

}
