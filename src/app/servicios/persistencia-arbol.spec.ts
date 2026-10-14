import { TestBed } from '@angular/core/testing';

import { PersistenciaArbol } from './persistencia-arbol';

describe('PersistenciaArbol', () => {
  let service: PersistenciaArbol;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenciaArbol);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
