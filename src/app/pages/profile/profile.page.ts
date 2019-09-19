import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:User={} as User;

  constructor(
    private apiService: ApiService
  ) {
    
  }

  public ngOnInit(): void {
    this.apiService.getUser().subscribe((user: User) => {
      this.user = user;
      console.log("Usuario => ", user);
    });
  }

}
