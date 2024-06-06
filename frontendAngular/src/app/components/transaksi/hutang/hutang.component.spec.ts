import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HutangComponent } from './hutang.component';

describe('HutangComponent', () => {
  let component: HutangComponent;
  let fixture: ComponentFixture<HutangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HutangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HutangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
