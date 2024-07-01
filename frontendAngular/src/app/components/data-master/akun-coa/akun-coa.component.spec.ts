import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkunCoaComponent } from './akun-coa.component';

describe('AkunCoaComponent', () => {
  let component: AkunCoaComponent;
  let fixture: ComponentFixture<AkunCoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AkunCoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AkunCoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
