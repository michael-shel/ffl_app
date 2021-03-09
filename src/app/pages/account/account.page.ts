
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService } from '../../services/auth.service'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ActionSheetController,NavController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { User } from '../../services/user';
import { ShopService } from '../../services/shop.service';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user : User;
  user$: Observable<User | null>;
  headerStyle = '';
  orders:any = [];

  constructor(
    private storage: Storage,
    private camera: Camera,
    private authService: AuthService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private crop: Crop,
    private imagePicker: ImagePicker,
    private file: File,
    public navCtrl: NavController,
    private shopService: ShopService,

  ) {
    this.user$ = authService.watchUser();
   }

   ngOnInit() {
    this.user$.subscribe((data) => {
    this.user = data;
    this.shopService.getUserOrders(this.user.id).subscribe((data)=>{
      this.orders = data;
      console.log(this.orders);
    })
      
    
    console.log(this.user);
    });
   }

    goStore(){
      this.headerStyle="d-none";
      setTimeout(() => {
        this.navCtrl.navigateBack(['/app/app/home']);  
      }, 100);
      
    }

    goSetting(){
      // this.headerStyle="d-none";
      // setTimeout(() => {
        this.navCtrl.navigateForward(['/settings']);  
      // }, 100);
      
    }

    updateProfile(){ 
      this.authService.pokeUser(this.user); 
    }

  //   async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: SettingsPage,
  //     componentProps: {
  //       username: this.user
  //     }
  //   });
  //   modal.onWillDismiss().then(data => {
  //     this.user["phone"] = data.data;
  //     this.updateProfile();
  //     this.storage.set('user', this.user);

  //   })
  //   return await modal.present();
  // }

  async getUser(){
    console.log(this.storage.get('user'));
    // window.dispatchEvent(new CustomEvent('user:update'));
  }
  
  

}
