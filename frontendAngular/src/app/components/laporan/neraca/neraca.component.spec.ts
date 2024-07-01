import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeracaComponent } from './neraca.component';

describe('NeracaComponent', () => {
  let component: NeracaComponent;
  let fixture: ComponentFixture<NeracaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NeracaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NeracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
