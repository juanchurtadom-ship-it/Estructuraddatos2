import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ejercicio2 } from './ejercicio2';

describe('Ejercicio2', () => {
  let component: Ejercicio2;
  let fixture: ComponentFixture<Ejercicio2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejercicio2],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejercicio2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
