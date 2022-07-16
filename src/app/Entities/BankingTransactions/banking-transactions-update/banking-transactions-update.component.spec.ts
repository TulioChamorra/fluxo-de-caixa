import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingTransactionsUpdateComponent } from './banking-transactions-update.component';

describe('ProductFormComponent', () => {
  let component: BankingTransactionsUpdateComponent;
  let fixture: ComponentFixture<BankingTransactionsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingTransactionsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingTransactionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
