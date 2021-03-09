import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'products/:id',
            children: [
              {
                path: '',
                loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule)
              },
            ]
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                loadChildren: () => import('../product/product.module').then( m => m.ProductPageModule)
              },
            ]
          }
        ]
      },
      {
        path: 'recipes',
        children: [
          {
            path: '',
            loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesPageModule)
          },
          {
            path: 'recipe/:id',
            children: [
              {
                path: '',
                loadChildren: () => import('../recipe/recipe.module').then( m => m.RecipePageModule)
              },
            ]
          },
          {
            path: 'wishlist-recipes',
            children: [
              {
                path: '',
                loadChildren: () => import('../wishlist-recipes/wishlist-recipes.module').then( m => m.WishlistRecipesPageModule)
              },
            ]
          },
        ]
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: 'app/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'app/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
