import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: '', redirectTo: 'app/app/home', pathMatch: 'full' 
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'select-store',
    loadChildren: () => import('./pages/select-store/select-store.module').then( m => m.SelectStorePageModule)
  },
  {
    path: 'catalog',
    loadChildren: () => import('./pages/catalog/catalog.module').then( m => m.CatalogPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./pages/recipes/recipes.module').then( m => m.RecipesPageModule)
  },
  {
    path: 'recipe/:id',
    loadChildren: () => import('./pages/recipe/recipe.module').then( m => m.RecipePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./pages/wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  {
    path: 'wishlist-recipes',
    loadChildren: () => import('./pages/wishlist-recipes/wishlist-recipes.module').then( m => m.WishlistRecipesPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'show-product',
    loadChildren: () => import('./pages/show-product/show-product.module').then( m => m.ShowProductPageModule)
  },
  {
    path: 'search-product',
    loadChildren: () => import('./pages/search-product/search-product.module').then( m => m.SearchProductPageModule)
  },
  {
    path: 'search-recipe',
    loadChildren: () => import('./pages/search-recipe/search-recipe.module').then( m => m.SearchRecipePageModule)
  }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
