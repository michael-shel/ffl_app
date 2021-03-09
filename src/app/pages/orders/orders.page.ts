import { Product, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ShopService } from '../../services/shop.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders:any = [];
  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    private shopService: ShopService,
  ) { }

  
  ngOnInit() {
    this.shopService.getOrders().subscribe(data => {
        this.orders = data;
    })
  }



  close() {
    this.modalCtrl.dismiss();
  }

}
