import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarikModalComponent } from './tarik-modal.component';

describe('TarikModalComponent', () => {
  let component: TarikModalComponent;
  let fixture: ComponentFixture<TarikModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarikModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarikModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
