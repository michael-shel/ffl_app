import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
// import { HideHeaderDirective } from './directives/hide-header.directive';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';

import { CartPageModule } from './pages/cart/cart.module';
import { WishlistPageModule } from './pages/wishlist/wishlist.module';
import { OrdersPageModule } from './pages/orders/orders.module';
import { ShowProductPageModule } from './pages/show-product/show-product.module';
import { SearchProductPageModule } from './pages/search-product/search-product.module';
import { SearchRecipePageModule } from './pages/search-recipe/search-recipe.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';

// import { UsernamePage } from '/modals/username/username.page';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    CartPageModule,
    WishlistPageModule,
    OrdersPageModule,
    ShowProductPageModule,
    SearchProductPageModule,
    SearchRecipePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,},
    Facebook,
    GooglePlus,
    Camera,
    Crop,
    ImagePicker,
    File,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
