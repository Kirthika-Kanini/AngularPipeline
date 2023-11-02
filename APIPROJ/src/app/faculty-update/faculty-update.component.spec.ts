import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyUpdateComponent } from './faculty-update.component';

describe('FacultyUpdateComponent', () => {
  let component: FacultyUpdateComponent;
  let fixture: ComponentFixture<FacultyUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyUpdateComponent]
    });
    fixture = TestBed.createComponent(FacultyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
