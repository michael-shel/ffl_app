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
export class WishlistService {
  data: Product[] = [
  ];
 
  private wishlist = [];
  private wishlistItemCount = new BehaviorSubject(0);
  private totalPriceWishlist = new BehaviorSubject(0);
  private wishlist_subscribe = new BehaviorSubject([]);
  constructor(
    private storage: Storage,
  ) {
    this.storage.get('wishlist').then((val) => {
      if(val){
        this.wishlist = val;
      }
    });
    this.storage.get('wishlistItemCount').then((val) => {
      if(val){
        this.wishlistItemCount.next(val);
      }
    });
    this.storage.get('totalPriceWishlist').then((val) => {
      if(val){
        this.totalPriceWishlist.next(val);
      }
    });
  }
 
  public getProducts() {
    return this.data;
  }
 
  public getWishlist() {
    return this.wishlist
  }
 
  public getWishlistItemCount() {
    return this.wishlistItemCount;
  }
  public getWishlistSubscribe() {
    return this.wishlist_subscribe;
  }

  public clearWishlist() {
    this.wishlist = [];
    this.wishlistItemCount.next(0);
    this.totalPriceWishlist.next(0); 

    this.storage.set('wishlist', this.wishlist);
    this.storage.set('wishlistItemCount', 0);
    this.storage.set('totalPriceWishlist', 0);

    this.updateWishlist(this.wishlist);
  }
  
  public updateWishlist(wishlist) {
    this.wishlist_subscribe.next(wishlist);
  }

  public addProduct(product) {
    let added = false;
    for (let p of this.wishlist) {
      if (p.id === product.id) {
        // p.amount += 1;
        added = true;
        this.decreaseProduct(product);
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.wishlist.push(product);
      this.wishlistItemCount.next(this.wishlistItemCount.value + 1);
    }
    this.updateWishlist(this.wishlist);
    this.storage.set('wishlist', this.wishlist);
    this.storage.set('wishlistItemCount', this.wishlistItemCount.value);
    this.storage.set('totalPriceWishlist', this.totalPriceWishlist.value);
  }
 
  public inWishlist(product){
    for (let p of this.wishlist) {
      if (p.id === product.id) {
        return true;
      }
    }
    return false;
  }

  public decreaseProduct(product) {
    this.wishlist.forEach((p,index) => {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.wishlist.splice(index, 1);
        }
      }
    });
    // for (let [index, p] of this.wishlist) {
      
    // }
    this.updateWishlist(this.wishlist);
    this.wishlistItemCount.next(this.wishlistItemCount.value - 1);
    this.storage.set('wishlist', this.wishlist);
    this.storage.set('wishlistItemCount', this.wishlistItemCount.value);
    this.storage.set('totalPriceWishlist', this.totalPriceWishlist.value);
  }
 
  public removeProduct(product) {
    for (let [index, p] of this.wishlist) {
      if (p.id === product.id) {
        this.wishlistItemCount.next(this.wishlistItemCount.value - p.amount);
        this.wishlist.splice(index, 1);
      }
    }
    this.updateWishlist(this.wishlist);
    this.storage.set('wishlist', this.wishlist);
    this.storage.set('wishlistItemCount', this.wishlistItemCount.value);
    this.storage.set('totalPriceWishlist', this.totalPriceWishlist.value);
  }

  public getTotal() {
    return this.totalPriceWishlist;
  }
}