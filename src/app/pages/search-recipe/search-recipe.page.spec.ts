import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchRecipePage } from './search-recipe.page';

describe('SearchRecipePage', () => {
  let component: SearchRecipePage;
  let fixture: ComponentFixture<SearchRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
