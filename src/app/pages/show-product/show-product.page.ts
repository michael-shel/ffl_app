import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ShopService } from '../../services/shop.service';
@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.page.html',
  styleUrls: ['./show-product.page.scss'],
})
export class ShowProductPage implements OnInit {

  similar:any=[];

  constructor(
    public modalController: ModalController,
    private cartService: CartService,
    private wishlistService: WishlistService, 
    private shopService: ShopService,
  ) { }
    product;
  
  ngOnInit() {
    console.log(this.product);
    this.shopService.getSimilar(this.product.id).subscribe((data)=>{
      data.forEach(product => {
        if(product.id != this.product.id){
          if(this.wishlistService.inWishlist(product)){
            product.added = true;
          }
          this.similar.push(product)
        }
      });
      console.log(this.similar);
    });
    
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }
  addToWishlist(product) {
    product.added = !product.added;
    this.wishlistService.addProduct(product);
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
