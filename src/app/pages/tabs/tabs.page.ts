import { CartService } from '../../services/cart.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  cartItemCount: BehaviorSubject<number>;
  totalPrice: BehaviorSubject<number>;
  
  
  constructor(
    private cartService: CartService, 
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cartItemCount = this.cartService.getCartItemCount();
    this.totalPrice = this.cartService.getTotal();
  }
 
  async openCart() {
    // this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: CartPage,
      // cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }
  
}
