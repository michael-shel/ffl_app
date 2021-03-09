import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { tap,map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EnvService } from './env.service';
 
export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  code: number;
}
export interface Store {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
  ];
  store: Store[] = [
  ];
 
  
  
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  private totalPrice = new BehaviorSubject(0);
  private storeSelected = null;
 
  constructor(
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
  ) {
      this.storage.get('cart').then((val) => {
        if(val){
          this.cart = val;
          // console.log(val);
        }
      });
      this.storage.get('cartItemCount').then((val) => {
        if(val){
          this.cartItemCount.next(val);
          // console.log(val);
        }
      });
      this.storage.get('totalPrice').then((val) => {
        if(val){
          this.totalPrice.next(val);
          // console.log(val);
        }
      });
  }

  public storegaCart(){
    
  }
  public getStore() {
    return this.storeSelected;
  }

  public getStores() {
    return this.http.get<any>(this.env.API_URL + 'stores')
 }

  public getProducts() {
    return this.data;
  }
 
  public getCart() {
    return this.cart;
  }
 
  public getCartItemCount() {
    return this.cartItemCount;
  }

  public clearCart() {
    this.cart = [];
    this.cartItemCount.next(0);
    this.totalPrice.next(0); 

    this.storage.set('cart', this.cart);
    this.storage.set('cartItemCount', 0);
    this.storage.set('totalPrice', 0);
  }
 
  public addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }

    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.totalPrice.next(this.cart.reduce((i, j) => i + j.price * j.amount, 0)) 
    this.storage.set('cart', this.cart);
    this.storage.set('cartItemCount', this.cartItemCount.value);
    this.storage.set('totalPrice', this.totalPrice.value);
    
  }
 
  public decreaseProduct(product) {
    this.cart.forEach((p,index) => {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    });
    
    this.cartItemCount.next(this.cartItemCount.value - 1);
    this.totalPrice.next(this.cart.reduce((i, j) => i + j.price * j.amount, 0))
    this.storage.set('cart', this.cart);
    this.storage.set('cartItemCount', this.cartItemCount.value);
    this.storage.set('totalPrice', this.totalPrice.value);
  }
 
  public removeProduct(product) {
    for (let [index, p] of this.cart) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
    this.storage.set('cartItemCount', this.cartItemCount.value);
    this.storage.set('cart', this.cart);
  }

  public getTotal() {
    return this.totalPrice;
  }
}