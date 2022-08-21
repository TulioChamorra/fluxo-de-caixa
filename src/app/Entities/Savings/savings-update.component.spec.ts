import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsUpdateComponent } from './savings-update.component';

describe('ProductFormComponent', () => {
  let component: SavingsUpdateComponent;
  let fixture: ComponentFixture<SavingsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
