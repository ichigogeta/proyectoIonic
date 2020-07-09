import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.checkToken();
  }

  public checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      console.log(res);

      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  public login(token): Promise<void> {
    return this.storage.set(TOKEN_KEY, token).then(() => {
      this.authenticationState.next(true);
    });
  }

  public logout(): Promise<void> {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  public isAuthenticated(): boolean {
    return this.authenticationState.value;
  }

}