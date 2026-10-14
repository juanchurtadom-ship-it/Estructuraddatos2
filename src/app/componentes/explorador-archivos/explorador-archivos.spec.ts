import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploradorArchivos } from './explorador-archivos';

describe('ExploradorArchivos', () => {
  let component: ExploradorArchivos;
  let fixture: ComponentFixture<ExploradorArchivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploradorArchivos],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploradorArchivos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
