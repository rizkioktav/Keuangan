import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferUangComponent } from './transfer-uang.component';

describe('TransferUangComponent', () => {
  let component: TransferUangComponent;
  let fixture: ComponentFixture<TransferUangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferUangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferUangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
