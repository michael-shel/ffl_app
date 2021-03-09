import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistRecipesPage } from './wishlist-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: WishlistRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistRecipesPageRoutingModule {}
