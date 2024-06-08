import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiutangComponent } from './piutang.component';

describe('PiutangComponent', () => {
  let component: PiutangComponent;
  let fixture: ComponentFixture<PiutangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiutangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiutangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
