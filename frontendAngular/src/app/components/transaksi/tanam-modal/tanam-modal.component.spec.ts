import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanamModalComponent } from './tanam-modal.component';

describe('TanamModalComponent', () => {
  let component: TanamModalComponent;
  let fixture: ComponentFixture<TanamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TanamModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TanamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
