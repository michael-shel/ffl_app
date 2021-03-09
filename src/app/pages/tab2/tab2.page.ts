import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  categories:any = [
  ];
  constructor(
    private shopService: ShopService,
    private router: Router,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.shopService.getCategories().subscribe((data)=>{
      this.categories = data.data;
      console.log(this.categories)
    })  
  }

  openProducts(id) {
    this.router.navigate(['products', id]);
  }
  openProduct(id) {
    this.router.navigate(['product', id]);
  }
  
}
