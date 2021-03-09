
import { Product, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ShopService } from '../../services/shop.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: Product[] = [];
  codes = [];
  codeReqest = '';
  stores = [];
  selectedStore:any;

  totals = [];
  all_carts = [];
  total_inStore = new BehaviorSubject(0);

 
  constructor(
    private cartService: CartService, 
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    private shopService: ShopService,) { 
      
    }
  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.selectedStore = this.shopService.getStore();
    // console.log(this.selectedStore);
    this.cart.forEach(product => {
      this.codeReqest+=product.code+',';
    });
    this.shopService.createCart(this.codeReqest).subscribe((data)=>{
      data.forEach(store => {
        const map = new Map();
        let result = [];
        for (let item of store.products) {
          if(!map.has(item.code)){
              map.set(item.code, true);    // set any value to Map
              result.push(item);
          }
        }
        store.products = result;
        this.stores.push(store);
      });
      console.log(this.stores);
      this.setAllCatrs(data);
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Очистити корзину',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.clearCart();
        }
      },{
        text: 'Відмінити',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
  setAllCatrs(data){

    const array = [
      { id: 3, name: 'Central Microscopy', fiscalYear: 2018 },
      { id: 5, name: 'Crystallography Facility', fiscalYear: 2018 },
      { id: 3, name: 'Central Microscopy', fiscalYear: 2017 },
      { id: 5, name: 'Crystallography Facility', fiscalYear: 2017 }
    ];
  
  
    var cart = this.cart;
    this.totals = [];
        data.forEach(store => {
          store.products.forEach(function (product) {
          cart.forEach(cart_product => {
            if (cart_product.code == product.code){
              product.amount = cart_product.amount;
            }
          });
        });
        this.totals.push({
          'id' : store.id,
          'value' : store.products.reduce((i, j) => i + j.price * j.amount, 0).toFixed(2)
        })
      });
    this.all_carts = data;
  }

  ResetAllCatrs(data,cart_product){
    var cart = this.cart;
    this.totals = [];
        data.forEach(store => {
        store.products.forEach(function (product) {
            if (cart_product.code == product.code){
              product.amount = cart_product.amount;
            }
        });
        this.totals.push({
          'id' : store.id,
          'value' : store.products.reduce((i, j) => i + j.price * j.amount, 0).toFixed(2)
        })
      });
    this.all_carts = data;
      console.log(this.all_carts);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
    this.totals = [];
  }

  selectShop(shop){
    shop.products.array.forEach(product => {
        this.cartService.addProduct(product);
    });
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
    this.ResetAllCatrs(this.stores,product)
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
    this.ResetAllCatrs(this.stores,product)
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async checkout() {
    // Perfom PayPal or Stripe checkout process
 
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
