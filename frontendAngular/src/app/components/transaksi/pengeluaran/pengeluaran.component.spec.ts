import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengeluaranComponent } from './pengeluaran.component';

describe('PengeluaranComponent', () => {
  let component: PengeluaranComponent;
  let fixture: ComponentFixture<PengeluaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PengeluaranComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PengeluaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
