import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapTransaksiComponent } from './lap-transaksi.component';

describe('LapTransaksiComponent', () => {
  let component: LapTransaksiComponent;
  let fixture: ComponentFixture<LapTransaksiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LapTransaksiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LapTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
