import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledUserSideComponent } from './enrolled-user-side.component';

describe('EnrolledUserSideComponent', () => {
  let component: EnrolledUserSideComponent;
  let fixture: ComponentFixture<EnrolledUserSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolledUserSideComponent]
    });
    fixture = TestBed.createComponent(EnrolledUserSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
