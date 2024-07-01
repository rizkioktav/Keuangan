import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurnalUmumComponent } from './jurnal-umum.component';

describe('JurnalUmumComponent', () => {
  let component: JurnalUmumComponent;
  let fixture: ComponentFixture<JurnalUmumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurnalUmumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JurnalUmumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
