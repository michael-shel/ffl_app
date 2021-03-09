import { Component } from '@angular/core';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './services/user';
import { Storage } from '@ionic/storage';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
    user : User;
    user$: Observable<User | null>;
    appPages = [
    {
      title: 'Account',
      url: '/account',
      icon: 'contact'
    },
    {
      title: 'Industy',
      url: '/set-industry',
      icon: 'contact'
    },
  ];


  constructor(
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastCtrl: ToastController,
    private storage: Storage,
    private authService: AuthService,
  ) {
    this.user$ = authService.watchUser();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleLightContent();
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#10dc60');
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });
  }
  

    ngOnInit(): void {
      // this.user = this.authService.user;
      this.user$.subscribe((data) => {
        this.user = data;
      });
      this.storage.get('user').then(val => {
        this.authService.pokeUser(val);
      })
    }

}
