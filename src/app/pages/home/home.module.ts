import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { CategoriesTreeComponent } from '../../components/categories-tree/categories-tree.component';
import { SelectStorePage } from '../select-store/select-store.page';

import { SharedModule } from '../../shared/shared.module'
@NgModule({
  imports: [
    HomePageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
  ],
  declarations: [HomePage,CategoriesTreeComponent,SelectStorePage],
  entryComponents: [SelectStorePage]
})
export class HomePageModule {}
