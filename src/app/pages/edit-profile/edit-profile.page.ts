import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  guardar(){
    //Guardar los datos.
    this.router.navigate(["/tabs/profile"]);
  }

}
