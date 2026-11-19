import { TestBed } from '@angular/core/testing';

import { Giphy } from './giphy';

describe('Giphy', () => {
  let service: Giphy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Giphy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
