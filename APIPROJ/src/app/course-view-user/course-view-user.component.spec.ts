import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseViewUserComponent } from './course-view-user.component';

describe('CourseViewUserComponent', () => {
  let component: CourseViewUserComponent;
  let fixture: ComponentFixture<CourseViewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseViewUserComponent]
    });
    fixture = TestBed.createComponent(CourseViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
