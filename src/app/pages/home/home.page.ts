
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SelectStorePage } from '../select-store/select-store.page';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { BehaviorSubject } from 'rxjs';
import { RecipesService } from  '../../services/recipes.service';
import { WishlistPage } from '../wishlist/wishlist.page';
import { OrdersPage } from '../orders/orders.page';
import { ShowProductPage } from '../show-product/show-product.page';
import { SearchProductPage } from '../search-product/search-product.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('wishlist', {static: false, read: ElementRef})fab: ElementRef;
  @ViewChild('orders', {static: false, read: ElementRef})fab2: ElementRef;
  @ViewChild('product', {static: false, read: ElementRef})fab3: ElementRef;
  @ViewChild('search', {static: false, read: ElementRef})fab4: ElementRef;

  categories:any = [
  ];
  category:any=[];
  category_lenght=0;
  products:any = [
  ];

  
  selectedStore: BehaviorSubject<object>;

  cart = [];
  products_cart = [];
  cartItemCount: BehaviorSubject<number>;
  wishlistItemCount: BehaviorSubject<number>;
  totalPrice: BehaviorSubject<number>;
  recipeItemCount: BehaviorSubject<number>;
  totalCounter = new BehaviorSubject(0);
  wishlist_subscribe = new BehaviorSubject([]);


  constructor(
    private shopService: ShopService,
    private router: Router,
    public recipesService: RecipesService, 
    public modalController: ModalController,
    private cartService: CartService,
    private wishlistService: WishlistService, 
  ) { }

  ngOnInit() {

    this.renderShop();
    
    this.wishlist_subscribe = this.wishlistService.getWishlistSubscribe();
    this.selectedStore = this.shopService.getStore();
    // console.log(this.selectedStore);
    this.wishlistItemCount = this.wishlistService.getWishlistItemCount();
    this.recipeItemCount = this.recipesService.getRecipeItemCount();

    this.products_cart = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    
  }
  
  renderShop(){
    this.products = [];
    this.shopService.getCategories().subscribe((data)=>{
      this.categories = data.data;
      var item = this.categories[Math.floor(Math.random() * this.categories.length)];
      this.shopService.getCategoryProducts(item.id).subscribe((data)=>{
        this.category = data;
        if(this.category){
        console.log(data);
        this.category_lenght = this.category.categories_products.length;
        if(this.category_lenght>4){
          for (let i=0; i<4; i++){
            if(this.wishlistService.inWishlist(this.category.categories_products[i])){
              this.category.categories_products[i].added = true;
            }
            this.products.push(this.category.categories_products[i]);
          }
        }
        else{
          this.category.categories_products.forEach(product => {
            if(this.wishlistService.inWishlist(product)){
              product.added = true;
            }
            this.products.push(product);
          });
        }
        }
        console.log(this.products);
      })    
    });
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    // console.log(this.cart);
  }

  addToWishlist(product) {
    product.added = !product.added;
    this.wishlistService.addProduct(product);
  }

  inWishlist(product){
    this.wishlistService.inWishlist(product);
  }

  Account(){
    this.router.navigate(['account']);
  }
  goToProduct(){
    this.router.navigate(['/app/app/home/product/', this.category.id]);
  }

  async openWishlist() {
    // this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalController.create({
      component: WishlistPage,
      componentProps: { 
        status: 'product'
      }
      // cssClass: 'cart-modal'
    });
    
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  async openSearch() {
    // this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalController.create({
      component: SearchProductPage,
      // cssClass: 'cart-modal'

    });
    
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  async openOrders() {
    // this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalController.create({
      component: OrdersPage,
      // cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  async selectStore() {
    const modal = await this.modalController.create({
      component: SelectStorePage,
      
    });
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
      this.renderShop();

    });
    return await modal.present();
  }

  async openProduct(product) {
    // this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalController.create({
      component: ShowProductPage,
      componentProps: { 
        product: product
      }
      // cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
      this.products.forEach(product => {
        if(this.wishlistService.inWishlist(product)){
          product.added = true;
        }
        else{
          product.added = false;
        }
      });

    });
    modal.present();
  }


}
