import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  NavigationExtras } from '@angular/router';
import { ShopService } from '../../services/shop.service';
@Component({
  selector: 'app-wishlist-recipes',
  templateUrl: './wishlist-recipes.page.html',
  styleUrls: ['./wishlist-recipes.page.scss'],
})
export class WishlistRecipesPage implements OnInit {

  ids=[];
  recipes:any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shopService: ShopService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      for (const [key, value] of Object.entries(params)) {
        this.ids.push(parseInt(value));
        this.getRecipes(this.ids);
      }
    })
  }

  getRecipes(ids){
    this.shopService.getWhishlistRecipe(ids).subscribe(recipes =>{
    this.recipes = recipes;
    console.log(recipes);
    })
  }
  openRecipe(id) {
    this.router.navigate(['app/app/recipes/recipe',id]);
  }
  // goRecipes(){
  //     this.router.navigate(['app/app/recipes']);
  // }

}
