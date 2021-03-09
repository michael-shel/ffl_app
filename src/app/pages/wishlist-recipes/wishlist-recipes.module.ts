import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishlistRecipesPageRoutingModule } from './wishlist-recipes-routing.module';

import { WishlistRecipesPage } from './wishlist-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishlistRecipesPageRoutingModule
  ],
  declarations: [WishlistRecipesPage]
})
export class WishlistRecipesPageModule {}
