import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ShopService } from '../../services/shop.service';
import { ShowProductPage } from '../show-product/show-product.page';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.page.html',
  styleUrls: ['./search-product.page.scss'],
})
export class SearchProductPage implements OnInit {
  @ViewChild('product', {static: false, read: ElementRef})fab3: ElementRef;
  isItemAvailable = false;
  products:any = [];
  items:any = [];
  loading = false;
  constructor(
    public modalController: ModalController,
    private cartService: CartService,
    private wishlistService: WishlistService, 
    private shopService: ShopService,
  ) { }
  
    
  ngOnInit() {
    this.initializeItems();
  }

    initializeItems(){
      this.shopService.getProductsForSearch().subscribe((data)=>{
        data.forEach(product => {
          if(this.wishlistService.inWishlist(product)){
            product.added = true;
            this.items.push(product);
          }
          else{
            this.items.push(product);
          }
        });
        
      })
      // console.log(this.items);
      
    }

      getItems(ev: any) {
        
        const val = ev.target.value;
        if(val.length > 2){
          this.loading = true;
          setTimeout (() => {
            this.loading = false;
         }, 1000);
         
        this.products = this.items.filter(product => product.name.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
        }
        else{
          this.products = [];
        }
        
      }
      decreaseWishlistItem(product) {
        this.wishlistService.decreaseProduct(product);
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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}

