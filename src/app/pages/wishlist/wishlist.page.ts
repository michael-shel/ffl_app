
import { Product, WishlistService } from './../../services/wishlist.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { elementAt } from 'rxjs/operators';
import { ShopService } from 'src/app/services/shop.service';
import { ShowProductPage } from '../show-product/show-product.page';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  @ViewChild('product', { static: false, read: ElementRef }) fab3: ElementRef;

  wishlist: Product[] = [];
  recipe: any = [];
  store;
  status = '';
  constructor(
    private wishlistService: WishlistService,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private shopService: ShopService,
    public recipesService: RecipesService,
  ) { }

  ngOnInit() {
    console.log(this.status);
    this.store = this.shopService.getStore().value;
    this.wishlist = this.wishlistService.getWishlist()
    // this.wishlistService.getWishlist().forEach(element => {
    //   if(element.store_id == store['id']){
    //     this.wishlist.push(element);
    //   }
    // }); 
    this.recipe = this.recipesService.getRecipe();
    console.log(this.store);
    console.log(this.wishlist);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Очистити товари',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.clearWishlist();
        }
      },
      {
        text: 'Очистити рецепти',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          this.clearRecipe();
        }
      },
      {
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
  segmentChanged(ev: any) {
    this.status = ev;
  }
  clearWishlist() {
    this.wishlistService.clearWishlist();
    this.wishlist = [];
  }

  decreaseWishlistItem(product) {
    this.wishlistService.decreaseProduct(product);
  }

  increaseWishlistItem(product) {
    this.wishlistService.addProduct(product);
  }

  removeWishlistItem(product) {
    this.wishlistService.removeProduct(product);
  }

  findRecipe() {
    var ids = [];
    this.wishlist.forEach(product => {
      ids.push(product.id);
    });
    this.modalController.dismiss();
    this.router.navigate(['/app/app/recipes/wishlist-recipes/', ids]);
  }

  getTotal() {
    return this.wishlist.reduce((i, j) => i + j.price * j.amount, 0);
  }

  clearRecipe() {
    this.recipesService.clearRecipes();
    this.recipe = [];
  }

  decreaseRecipeItem(product) {
    this.recipesService.decreaseRecipe(product);
  }

  increaseRecipeItem(product) {
    this.recipesService.addRecipe(product);
  }

  removeRecipeItem(product) {
    this.recipesService.removeProduct(product);
  }

  async openProduct(product) {

    let modal = await this.modalController.create({
      component: ShowProductPage,
      componentProps: {
        product: product
      }
    });
    modal.onWillDismiss().then(() => {
      this.wishlist.forEach(product => {
        if (this.wishlistService.inWishlist(product)) {
          product['added'] = true;
        }
        else {
          product['added'] = false;
        }
      });

    });
    modal.present();
  }

  close() {
    this.modalController.dismiss();
  }

  async checkout() {
    // Perfom PayPal or Stripe checkout process

    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalController.dismiss();
    });
  }
}
