import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcursosPage } from './concursos.page';

describe('ConcursosPage', () => {
  let component: ConcursosPage;
  let fixture: ComponentFixture<ConcursosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcursosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
