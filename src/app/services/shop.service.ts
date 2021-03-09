import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { tap,map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EnvService } from './env.service';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private selectedStore = new BehaviorSubject({});

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private env: EnvService,
  ) {
    this.storage.get('selectedStore').then((val) => {
      if(val){
      this.selectedStore.next(val);
      console.log(this.selectedStore);
      }
    });
    this.storage.set('token',null);
   }
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public getCategories() {
     return this.http.get<any>(this.env.API_URL + 'categories')
  }
  public onlyCategory(id) {
    return this.http.get<any>(this.env.API_URL + 'only_category/' + id)
  }
  public getCategoryProducts(id) {
    return this.http.get<any>(this.env.API_URL + 'category_products/' + id +'?shop_id='+this.selectedStore.value['id'])
  }
  public getCategoryProductsOnly(id) {
    // this.storage.get('selectedStore').then((val) => {
    //   if(val){
    //   var store_id = val._value.id;
    //   return this.http.get<any>(this.env.API_URL + 'only_category_products/' + id +'?shop_id='+store_id)
    //   }
    // });
    return this.http.get<any>(this.env.API_URL + 'only_category_products/' + id +'?shop_id=1')
  }
  public getProduct(id) {
    return this.http.get<any>(this.env.API_URL + 'get_product/' + id)
  }
  public getProducts() {
    return this.http.get<any>(this.env.API_URL + 'get_products')
  }
  public getProductsForSearch() {
    return this.http.get<any>(this.env.API_URL + 'get_products_for_search?shop_id=1')
  }
  public getRecipes() {
    return this.http.get<any>(this.env.API_URL + 'recipes')
  }
  public getRecipe(id) {
    return this.http.get<any>(this.env.API_URL + 'get_recipe/' + id)
  }
  public getWhishlistRecipe(ids) {
    return this.http.get<any>(this.env.API_URL + 'to_wishlist?ids=' + ids)
  }
  public getStores() {
    return this.http.get<any>(this.env.API_URL + 'stores')
  }
  public getOrders(){
    return this.http.get<any>(this.env.API_URL + 'employee')
  }
  public getUserOrders(id){
    return this.http.get<any>(this.env.API_URL + 'user_orders/'+ id)
  }
  public getSimilar(id){
    return this.http.get<any>(this.env.API_URL + 'get_similar/' + id)
  }
  public setStores(store) {
    this.selectedStore.next(store);
    this.storage.set('selectedStore', this.selectedStore);
    this.storage.get('selectedStore').then((val) => {
      if(val._value){
        this.selectedStore.next(val._value);
      }
    });
  }
  public getStore(){
    this.storage.get('selectedStore').then((val) => {
      this.selectedStore.next(val._value);
    });
    return this.selectedStore;
  }
  public createCart(codes) {
    return this.http.get<any>(this.env.API_URL + 'create_cart?codes=' + codes)
  }
  
}

