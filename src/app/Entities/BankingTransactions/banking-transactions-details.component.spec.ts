import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingTransactionsDetailsComponent } from './banking-transactions-details.component';

describe('ProductDetailsComponent', () => {
  let component: BankingTransactionsDetailsComponent;
  let fixture: ComponentFixture<BankingTransactionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingTransactionsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingTransactionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
