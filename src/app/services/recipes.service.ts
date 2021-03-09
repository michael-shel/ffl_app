import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  data: Product[] = [
  ];
 
  private recipe = [];
  private recipeItemCount = new BehaviorSubject(0);
  private totalPriceRecipe = new BehaviorSubject(0);
  private recipe_subscribe = new BehaviorSubject([]);
  constructor(
    private storage: Storage,
  ) {
    this.storage.get('recipe').then((val) => {
      if(val){
        this.recipe = val;
      }
    });
    this.storage.get('recipeItemCount').then((val) => {
      if(val){
        this.recipeItemCount.next(val);
      }
    });
    this.storage.get('totalPriceRecipe').then((val) => {
      if(val){
        this.totalPriceRecipe.next(val);
      }
    });
  }
 
  public getRecipes() {
    return this.data;
  }
 
  public getRecipe() {
    return this.recipe;
  }
 
  public getRecipeItemCount() {
    return this.recipeItemCount;
  }
  public getRecipeItemSubscribe() {
    return this.recipe_subscribe;
  }

  public clearRecipes() {
    this.recipe = [];
    this.recipeItemCount.next(0);
    this.totalPriceRecipe.next(0); 


    this.storage.set('recipe', this.recipe);
    this.storage.set('recipeItemCount', 0);
    this.storage.set('totalPricerecipe', 0);

    this.updateRecipe(this.recipe);
  }
  
  public updateRecipe(recipe) {
    this.recipe_subscribe.next(recipe);
  }

  public inRecipes(product){
    let added = false;
    for (let p of this.recipe) {
      if (p.id === product.id) {
        // p.amount += 1;
        added = true;
        return true;
      }
    }
    return false;
  }

  public addRecipe(product) {
    let added = false;
    for (let p of this.recipe) {
      if (p.id === product.id) {
        added = true;
        this.decreaseRecipe(product);
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.recipe.push(product);
      this.recipeItemCount.next(this.recipeItemCount.value + 1);
    }
    this.updateRecipe(this.recipe);
    this.storage.set('recipe', this.recipe);
    this.storage.set('recipeItemCount', this.recipeItemCount.value);
    this.storage.set('totalPricerecipe', this.totalPriceRecipe.value);
    console.log(this.recipe);
  }

  public decreaseRecipe(product) {
    this.recipe.forEach((p,index) => {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.recipe.splice(index, 1);
        }
      }
    });
    this.updateRecipe(this.recipe);
    this.recipeItemCount.next(this.recipeItemCount.value - 1);
    this.storage.set('recipe', this.recipe);
    this.storage.set('recipeItemCount', this.recipeItemCount.value);
    this.storage.set('totalPricerecipe', this.totalPriceRecipe.value);
  }
 
  public removeProduct(product) {
    for (let [index, p] of this.recipe) {
      if (p.id === product.id) {
        this.recipeItemCount.next(this.recipeItemCount.value - p.amount);
        this.recipe.splice(index, 1);
      }
    }
    this.updateRecipe(this.recipe);
    this.storage.set('recipe', this.recipe);
    this.storage.set('recipeItemCount', this.recipeItemCount.value);
    this.storage.set('totalPricerecipe', this.totalPriceRecipe.value);
  }

  public getTotalRecipe() {
    return this.totalPriceRecipe;
  }
}