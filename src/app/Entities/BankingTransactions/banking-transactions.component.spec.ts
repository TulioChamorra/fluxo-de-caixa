import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingTransactionsComponent } from './banking-transactions.component';

describe('ProductListComponent', () => {
  let component: BankingTransactionsComponent;
  let fixture: ComponentFixture<BankingTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
