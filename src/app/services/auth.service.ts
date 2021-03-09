import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EnvService } from './env.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token: string;
  user: User;

  user$ = new BehaviorSubject<User | null>(null);
  watchUser(): Observable<User | null> { return this.user$; }
  peekUser(): User | null { return this.user$.value; }
  pokeUser(user: User): void { this.user$.next(user); }


  constructor(
    private storage: Storage,
    private http: HttpClient,
    private env: EnvService,
    private fb: Facebook,
    private googlePlus: GooglePlus,
  ) {
  }



  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'login',
      { email: email, password: password }
    ).pipe(
      tap(data => {

        this.storage.set('token', data['token']);
        this.storage.set('user', data['user']);
        this.token = data['token'];
        this.pokeUser(data['user']);
        console.log(data);
      }),
    )
  }

  register(name: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'register',
      { name: name, email: email, password: password })
  }

  googleAuth() {
    this.googlePlus.login({})
      .then((res) => {
        this.googleAuth = res;
        console.log(res);
      }, (err) => {
      })
  }
  getUser() {
    this.storage.get('user').then(val => {
      return val;
    });
  }


  async storageUser(data) {
    await this.storage.set('user', data);
    this.pokeUser(data);
  }

  signup(phone: String) {
    return this.http.post(this.env.API_URL + 'register',
      { phone: phone }
    );
  }

  updateUser(user, id) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + ' ' + this.token["token"]
    });

    return this.http.post(
      this.env.API_URL + 'update_user/' + id,
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      { headers: headers }
    ).pipe(
      tap(data => {
        this.storageUser(data);

      }),
    );
  }


  logout(): Promise<any> {
    return this.storage.remove('token').then(() => {
      return this.storage.remove('user');
      return window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

}
