import { Component, OnInit, ViewChild, ElementRef,} from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Router,  NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { BehaviorSubject } from 'rxjs';
import { WishlistPage } from '../wishlist/wishlist.page';
import { ShowProductPage } from '../show-product/show-product.page';
import { SearchProductPage } from '../search-product/search-product.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild('product', {static: false, read: ElementRef})fab3: ElementRef;
  @ViewChild('search', {static: false, read: ElementRef})fab4: ElementRef;

  id: number;
  category:any = [];
  sub:any = [];
  wishlistItemCount: BehaviorSubject<number>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private navCtrl: NavController,
    public modalController: ModalController,
    private cartService: CartService,
    private wishlistService: WishlistService, 
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.shopService.onlyCategory(this.id).subscribe((data)=>{
        if (data.sub.length == 0) {
          this.router.navigate(['/app/app/home/product/', this.id]);
        }
        // if (data.sub.length > 0){
          data.sub.forEach(sub => {
            this.shopService.getCategoryProductsOnly(sub.id).subscribe((products) => {
              sub.products = products;
              console.log(this.category);
            })
          });
          this.category = data;
          
        });
      });
        // }
        
        // if (this.sub.length < 1) {
        //   this.category.sub.forEach(sub => {

            // this.shopService.getCategoryProducts(sub.id).subscribe((data)=>{
              
              // let categories_products = [];
              // var random = [];
              // while(random.length < 4){
              //     var r = Math.floor(Math.random() * data.categories_products.length);
              //     if(random.indexOf(r) === -1) random.push(r);
              // }
              
              // for (let i=0; i<4; i++){

              //   if(this.wishlistService.inWishlist(data.categories_products[random[i]])){
              //     data.categories_products[random[i]].added = true;
              //   }
              //   categories_products.push(data.categories_products[random[i]]);
              // }
              // const product = {
              //   'id' : data.id,
              //   'name' : data.name,
              //   'small_icon' : data.small_icon,
              //   'categories_products' : categories_products,
              //   'products_length' : data.categories_products.length
              // };

              // this.sub.push(product);

            // })

          // });
        // }
        // console.log(this.sub);
        // console.log(this.category)
      // })  
      
    
    this.wishlistItemCount = this.wishlistService.getWishlistItemCount();
  
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
  addToCart(product) {
    this.cartService.addProduct(product);
  }
  addToWishlist(product) {
    this.wishlistService.addProduct(product);
    product.added = !product.added;
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
  goToProduct(id){
    this.router.navigate(['/app/app/home/product/', id]);
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
      this.sub.forEach(category => {
        category.categories_products.forEach(product => {
        if(this.wishlistService.inWishlist(product)){
          product.added = true;
        }
        else{
          product.added = false;
        }
        });
      });
    });
    
    return await modal.present();
  }

}
