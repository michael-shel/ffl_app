import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WishlistRecipesPage } from './wishlist-recipes.page';

describe('WishlistRecipesPage', () => {
  let component: WishlistRecipesPage;
  let fixture: ComponentFixture<WishlistRecipesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistRecipesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
