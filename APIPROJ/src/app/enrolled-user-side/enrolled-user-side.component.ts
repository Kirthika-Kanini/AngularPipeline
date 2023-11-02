import { Component } from '@angular/core';
import { Enroll } from '../Enroll';
import { EnrollService } from '../enroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-user-side',
  templateUrl: './enrolled-user-side.component.html',
  styleUrls: ['./enrolled-user-side.component.css']
})
export class EnrolledUserSideComponent {
  enrolledCourses: Enroll[] = [];
  choice: number = 0;

  constructor(private enrollService: EnrollService, private router: Router) {}

  ngOnInit(): void {
 
    this.getEnrolledCourses();
  }

  getEnrolledCourses(): void {
    const userFaculty: string | null = localStorage.getItem('userfaculty');
    const userStudent: string | null = localStorage.getItem('userstudent');

    let username: string | null = null;

    if (userFaculty) {
      username = userFaculty;
      this.choice = 1;
    } else if (userStudent) {
      username = userStudent;
      this.choice = 2;
    }

    if (username) {
      this.enrollService.getEnrolls().subscribe((enrolls: Enroll[]) => {
        this.enrolledCourses = enrolls.filter(enrolled => enrolled.userName === username);
      });
    }
  }

  confirmEnrollment(courseId: number): void {
    console.log(courseId);
    if (this.choice === 1) {
      this.router.navigate(['/newfaculty'], { queryParams: { courseId: courseId } });
    } else if (this.choice === 2) {
      this.router.navigate(['/newstudent'], { queryParams: { courseId: courseId } });
    }
  }
}
