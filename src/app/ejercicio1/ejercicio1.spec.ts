import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ejercicio1 } from './ejercicio1';

describe('Ejercicio1', () => {
  let component: Ejercicio1;
  let fixture: ComponentFixture<Ejercicio1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejercicio1],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejercicio1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
