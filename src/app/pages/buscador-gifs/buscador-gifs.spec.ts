import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorGifs } from './buscador-gifs';

describe('BuscadorGifs', () => {
  let component: BuscadorGifs;
  let fixture: ComponentFixture<BuscadorGifs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorGifs],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorGifs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
