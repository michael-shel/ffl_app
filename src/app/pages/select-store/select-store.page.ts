import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShopService } from '../../services/shop.service';
import { CartService } from '../../services/cart.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-select-store',
  templateUrl: './select-store.page.html',
  styleUrls: ['./select-store.page.scss'],
})
export class SelectStorePage implements OnInit {
    locations = [];
    targetLocation = {
        latitude: 0,
        longitude: 0
    };
    closest = null;
    stores:any = [];

  constructor(
    public modalController: ModalController,
    private shopService: ShopService,
    private cartService: CartService,
    private geolocation: Geolocation,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.shopService.getStores().subscribe((data)=>{
      // data.data.forEach(element => {
      //   if(element.name != "EatForLife"){
      //     this.stores.push(element);
      //   }
      // });
      this.stores = data.data
      this.getPostition();
    });
  }

  getPostition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.targetLocation.latitude = resp.coords.latitude;
      this.targetLocation.longitude = resp.coords.longitude;
      this.getStores();
     }).catch((error) => {
       console.log('Error getting location', error);
    });
  }

  getStores(){
      this.stores.forEach(element => {
          let arrString = (element.gps.split(';'));
          arrString.forEach(gps => {
            let coords = gps.split(',');
            let location = {
              'id':element.id,
              'name':element.name,
              'latitude':coords[0].trim(),
              'longitude':coords[1].trim(),
            }
            this.locations.push(location);
          });
      });
      this.closest = this.closestLocation(this.targetLocation, this.locations);
      if(this.closest){
        this.presentToastWithOptions(this.closest.name);
      }
  }

  selectStore(store){
    this.shopService.setStores(store);
    this.cartService.clearCart();
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  closestLocation(targetLocation, locationData) {
    function vectorDistance(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    }

    function locationDistance(location1, location2) {
        var dx = location1.latitude - location2.latitude,
            dy = location1.longitude - location2.longitude;

        return vectorDistance(dx, dy);
    }

    return locationData.reduce(function(prev, curr) {
        var prevDistance = locationDistance(targetLocation , prev),
            currDistance = locationDistance(targetLocation , curr);
        return (prevDistance < currDistance) ? prev : curr;
    });
  }
  async presentToastWithOptions(name) {
    const toast = await this.toastController.create({
      header: 'Найближчий до ВАС!',
      message: "-<b><i>"+name+"</i></b>-",
      position: 'top',
      color: 'success',
      duration: 10000,
      buttons: [
        {
          side: 'start',
          icon: 'star',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Закрити',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
    });
    toast.present();
  }


}
