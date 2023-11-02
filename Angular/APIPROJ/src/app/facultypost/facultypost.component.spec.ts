import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultypostComponent } from './facultypost.component';

describe('FacultypostComponent', () => {
  let component: FacultypostComponent;
  let fixture: ComponentFixture<FacultypostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultypostComponent]
    });
    fixture = TestBed.createComponent(FacultypostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
