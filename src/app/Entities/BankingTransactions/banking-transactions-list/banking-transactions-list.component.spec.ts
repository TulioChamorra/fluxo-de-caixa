import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingTransactionsListComponent } from './banking-transactions-list.component';

describe('ProductListComponent', () => {
  let component: BankingTransactionsListComponent;
  let fixture: ComponentFixture<BankingTransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingTransactionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
