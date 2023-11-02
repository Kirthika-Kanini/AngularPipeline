import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledAdminSideComponent } from './enrolled-admin-side.component';

describe('EnrolledAdminSideComponent', () => {
  let component: EnrolledAdminSideComponent;
  let fixture: ComponentFixture<EnrolledAdminSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolledAdminSideComponent]
    });
    fixture = TestBed.createComponent(EnrolledAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
