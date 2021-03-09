import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { RecipesService } from '../../services/recipes.service';
import { ShopService } from '../../services/shop.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.page.html',
  styleUrls: ['./search-recipe.page.scss'],
})
export class SearchRecipePage implements OnInit {

  @ViewChild('product', {static: false, read: ElementRef})fab3: ElementRef;
  isItemAvailable = false;
  products:any = [];
  items:any = [];
  loading = false;
  constructor(
    public modalController: ModalController,
    private cartService: CartService,
    private recipesService: RecipesService, 
    private shopService: ShopService,
    private router: Router,
  ) { }
  recipes;
  
    
  ngOnInit() {
    this.initializeItems();
  }

    initializeItems(){
      // this.shopService.getRecipes().subscribe((data)=>{
      //   data.forEach(product => {
      //     if(this.recipesService.inRecipes(product)){
      //       product.added = true;
      //       this.items.push(product);
      //     }
      //     else{
      //       this.items.push(product);
      //     }
      //   });
        
      // })
      // console.log(this.items);
      
    }
    RecipeRoute(id){
      this.dismiss();
      this.router.navigate(['/app/app/recipes/recipe/', id]);

    }
      getItems(ev: any) {
        
        const val = ev.target.value;
        if(val.length > 2){
          this.loading = true;
          setTimeout (() => {
            this.loading = false;
         }, 1000);
         
        this.products = this.recipes.filter(product => product.name.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
        }
        else{
          this.products = [];
        }
        
      }
      decreaseWishlistItem(product) {
        this.recipesService.decreaseRecipe(product);
      }
    
      addToWishlist(product) {
        product.added = !product.added;
        this.recipesService.addRecipe(product);
      }
    
      inRecipes(recipe) {
        // console.log(this.recipesService.inRecipes(recipe));
        this.recipesService.inRecipes(recipe);
      }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  

}



