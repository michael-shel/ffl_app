import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss'],
})
export class CategoriesTreeComponent implements OnInit {

  
  constructor(
    private shopService: ShopService,
  ) { }
  // its just list data from here down
  categories:any = [

  ];


  ngOnInit() {
    this.shopService.getCategories().subscribe((data)=>{
      this.categories = data.data;
      console.log(this.categories)
    })  
  }

}


