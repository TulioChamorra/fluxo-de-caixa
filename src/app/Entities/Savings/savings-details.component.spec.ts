import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsDetailsComponent } from './savings-details.component';

describe('ProductDetailsComponent', () => {
  let component: SavingsDetailsComponent;
  let fixture: ComponentFixture<SavingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
