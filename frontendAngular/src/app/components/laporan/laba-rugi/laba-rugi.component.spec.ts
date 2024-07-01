import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabaRugiComponent } from './laba-rugi.component';

describe('LabaRugiComponent', () => {
  let component: LabaRugiComponent;
  let fixture: ComponentFixture<LabaRugiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabaRugiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabaRugiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
