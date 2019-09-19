import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { confirmPassword, codeErrors } from 'src/app/utils/utils';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User = {} as User;
  form: FormGroup;

  constructor(private apiService: ApiService,
    private formBuilder:FormBuilder,
    private utilities:UtilitiesService) {

  }

  public ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
      password_confirmation:['',confirmPassword]
    });

    this.apiService.getUser().subscribe((user: User) => {
      this.user = user;
      this.form.patchValue(user);
    });

    this.apiService.userChanges.subscribe((user:User)=>{
      this.user=user;
    });
  }

  public submitForm():void{
    this.apiService.updateUser(this.form.value).subscribe((user:User)=>{
      this.user=user;
      this.utilities.showToast('Usuario actualizado correctamente');
    },(error)=>{
      this.utilities.showToast(codeErrors(error));
    });
  }

}
