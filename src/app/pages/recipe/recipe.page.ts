import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Router,  NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { RecipesService } from  '../../services/recipes.service';
import { WishlistPage } from '../wishlist/wishlist.page';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { ShowProductPage } from '../show-product/show-product.page';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  @ViewChild('product', {static: false, read: ElementRef})fab3: ElementRef;
  id: number;

  recipe:any = {};
  recipeItemCount: BehaviorSubject<number>;
  items = [];
  numTimesLeft = 5;
  index = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private navCtrl: NavController,
    public recipesService: RecipesService, 
    public modalController: ModalController,
    private wishlistService: WishlistService, 
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.shopService.getRecipe(this.id).subscribe((data)=>{
        if( this.recipesService.inRecipes(data) ){
          data.added = true;
        }  
        this.recipe = data;
        console.log(this.recipe);
      })
    });
    this.recipeItemCount = this.recipesService.getRecipeItemCount();
  }

  addToWishlist(product) {
    product.added = !product.added;
    this.wishlistService.addProduct(product);
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  Account(){
    this.router.navigate(['account']);
  }

  addRecipeToWishlist(recipe) { 
    recipe.added = !recipe.added;
    this.recipesService.addRecipe(recipe);
  }

  addAll(){
    this.recipe.products.forEach(product => {
      this.addToCart(product);
    });
  }

  async openWishlist() {
    // this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalController.create({
      component: WishlistPage,
      componentProps: { 
        status: 'recipe'
      }
      // cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  goBack() {
    this.router.navigate(['/app/app/recipes/']);
  }
  async showProduct(product) {
    const modal = await this.modalController.create({
      component: ShowProductPage,
      componentProps: { 
        product: product
      }
    });
    return await modal.present();
  }

}
