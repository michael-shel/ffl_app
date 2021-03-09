import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Router,  NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { RecipesService } from  '../../services/recipes.service';
import { WishlistPage } from '../wishlist/wishlist.page';
import { SearchRecipePage } from '../search-recipe/search-recipe.page';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  id: number;
  recipes:any = [];
  sub:any = [];


  recipeItemCount: BehaviorSubject<number>;
  items = [];
  numTimesLeft = 5;
  index = 0;

  @ViewChild(IonInfiniteScroll,{static: false}) infiniteScroll: IonInfiniteScroll;
  @ViewChild('search', {static: false, read: ElementRef})fab4: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private navCtrl: NavController,
    public recipesService: RecipesService, 
    public modalController: ModalController,
  ) { 
  }

  ngOnInit() {
    this.shopService.getRecipes().subscribe((data)=>{
      data.data.forEach(recipe => {
        if( this.recipesService.inRecipes(recipe) ){
          recipe.added = true;
        }  
        this.recipes.push(recipe);
      });
      console.log(this.recipes);
          this.addMoreItems();
    });
    this.recipeItemCount = this.recipesService.getRecipeItemCount();
  }

  async openSearch() {
    // this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalController.create({
      component: SearchRecipePage,
      // cssClass: 'cart-modal'
      componentProps: { 
        recipes: this.recipes
      }
    });
    
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  openProducts(id) {
    this.router.navigate(['/app/app/catalog/products/', id]);
  }
  openRecipe(id) {
    this.router.navigate(['app/app/recipes/recipe',id]);
  }
  goBack() {
    this.navCtrl.back();
  }
  goCatalog() {
    this.router.navigate(['app/app/catalog']);
  }

  addRecipeToWishlist(recipe) {
    recipe.added = !recipe.added;
    this.recipesService.addRecipe(recipe);
  }
  Account(){
    this.router.navigate(['account']);
  }
  inRecipes(recipe) {
    // console.log(this.recipesService.inRecipes(recipe));
    this.recipesService.inRecipes(recipe);
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

  loadData(event) {
    if(this.index < this.recipes.length){
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
    {
        this.items.push(this.recipes[0]);
        this.index++;
    }
    }
  }
}



