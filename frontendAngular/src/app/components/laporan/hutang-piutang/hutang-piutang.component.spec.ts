import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HutangPiutangComponent } from './hutang-piutang.component';

describe('HutangPiutangComponent', () => {
  let component: HutangPiutangComponent;
  let fixture: ComponentFixture<HutangPiutangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HutangPiutangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HutangPiutangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
