import { Component, OnInit, ViewChild, ViewChildren,ElementRef } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Router,  NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { BehaviorSubject } from 'rxjs';
import { WishlistPage } from '../wishlist/wishlist.page';
import { ShowProductPage } from '../show-product/show-product.page';
import { SearchProductPage } from '../search-product/search-product.page';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  @ViewChild('product', {static: false, read: ElementRef})fab3: ElementRef;
  @ViewChild('search', {static: false, read: ElementRef})fab4: ElementRef;
  id: number;
  category:any = [];
  sub:any = [];

  wishlistItemCount: BehaviorSubject<number>;
  term = 'За популярність'
  items = [];
  numTimesLeft = 5;
  index = 0;


  @ViewChild(IonInfiniteScroll,{static: false}) infiniteScroll: IonInfiniteScroll;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private navCtrl: NavController,
    public modalController: ModalController,
    private cartService: CartService,
    private wishlistService: WishlistService, 
  ) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.shopService.getCategoryProducts(this.id).subscribe((data)=>{
        this.category = data;
        this.category.sub.forEach(sub => {
          this.shopService.getCategoryProducts(sub.id).subscribe((data)=>{
          })  
        });
        // console.log(this.category)
        this.addMoreItems();
      })  
      // console.log(this.sub);
    });
    this.wishlistItemCount = this.wishlistService.getWishlistItemCount();
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

  Account(){
    this.router.navigate(['account']);
  }

  Sort(term){
    this.term = term;
    this.items = [];
    this.index = 0;
    if(term == 'Спочатку дешеві'){
      this.category.categories_products.sort(this.compareValues('price','acs'));  
      this.addMoreItems();
    };
    if(term == 'Спочатку дорогі'){
      this.category.categories_products.sort(this.compareValues('price','desc'));  
      this.addMoreItems();
    };
    if(term == 'За популярністю'){
      this.category.categories_products.sort(this.compareValues('id','acs'));  
      this.addMoreItems();
    };
    
  }
  onChange(value){
    console.log(value);
  }
  
  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  addToWishlist(product) {
    this.wishlistService.addProduct(product);
    product.added = !product.added;
  }
  
  addToCart(product) {
    this.cartService.addProduct(product);
  }
  openProducts(id) {
    this.router.navigate(['/app/app/catalog/products/', id]);
  }
  openProduct(id) {
    this.router.navigate(['product', id]);
  }
  goBack() {
    this.navCtrl.back();
  }
  goCatalog() {
    this.router.navigate(['app/app/catalog']);
  }

  loadData(event) {
    if(this.index < this.category.categories_products.length){
      setTimeout(() => {
        console.log('Done');
        this.addMoreItems();
        this.numTimesLeft -= 1;
        event.target.complete();
      }, 2000);
    }
    else{
      event.target.disabled = true;
    }
  }

  addMoreItems() {
    for (let i=0; i<10; i++){
      if(this.index < this.category.categories_products.length){
        if(this.wishlistService.inWishlist(this.category.categories_products[this.index])){
          this.category.categories_products[this.index].added = true;
        }
        this.items.push(this.category.categories_products[this.index]);
        this.index++;
      }
    }
  }

  async showProduct(product) {
    const modal = await this.modalController.create({
      component: ShowProductPage,
      componentProps: { 
        product: product
      }
    });
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
      this.items.forEach(product => {
        if(this.wishlistService.inWishlist(product)){
          product.added = true;
        }
        else{
          product.added = false;
        }
      });

    });
    return await modal.present();
  }
  
}
