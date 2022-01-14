import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConcursosComponent } from './app-concursos.component';

describe('AppConcursosComponent', () => {
  let component: AppConcursosComponent;
  let fixture: ComponentFixture<AppConcursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppConcursosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConcursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
