import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSearchFormComponent } from './order-search-form.component';

describe('OrderSearchFormComponent', () => {
  let component: OrderSearchFormComponent;
  let fixture: ComponentFixture<OrderSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
