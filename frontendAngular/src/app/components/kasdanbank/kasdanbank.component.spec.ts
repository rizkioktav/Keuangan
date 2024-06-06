import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasdanbankComponent } from './kasdanbank.component';

describe('KasdanbankComponent', () => {
  let component: KasdanbankComponent;
  let fixture: ComponentFixture<KasdanbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KasdanbankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KasdanbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
