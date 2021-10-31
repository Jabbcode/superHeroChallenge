import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoAlturaComponent } from './peso-altura.component';

describe('PesoAlturaComponent', () => {
  let component: PesoAlturaComponent;
  let fixture: ComponentFixture<PesoAlturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesoAlturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesoAlturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
