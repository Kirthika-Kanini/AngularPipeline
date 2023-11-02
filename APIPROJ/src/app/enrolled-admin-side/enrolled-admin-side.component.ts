import { Component } from '@angular/core';
import { Enroll } from '../Enroll';
import { EnrollService } from '../enroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-admin-side',
  templateUrl: './enrolled-admin-side.component.html',
  styleUrls: ['./enrolled-admin-side.component.css']
})
export class EnrolledAdminSideComponent {
  enrolledCourses: Enroll[] = [];

  constructor(private enrollService: EnrollService,private router:Router) {}

  ngOnInit(): void {
    const userStudent: string | null = localStorage.getItem('userstudent');
    const userFaculty: string | null = localStorage.getItem('userfaculty');

    let username: string | null = null;

    if (userFaculty ) {
      username = userFaculty;
      this.router.navigateByUrl('/forbidden')
    } 
    else if(userStudent){
      username = userStudent;
      this.router.navigateByUrl('/forbidden')
    }
    this.getEnrolledCourses();
  }

  getEnrolledCourses(): void {
    this.enrollService.getEnrolls().subscribe(
      (enrolls: Enroll[]) => {
        this.enrolledCourses = enrolls;
      },
      (error: any) => {
        console.error('Error retrieving enrolled courses:', error);
      }
    );
  }

  isAcceptButtonDisabled(course: Enroll): boolean {
    const acceptedCourses = this.enrolledCourses.filter(
      (enroll: Enroll) => enroll.status === 'accepted' && enroll.courseName === course.courseName
    );

    return acceptedCourses.length >= 5;
  }

  acceptStatus(course: Enroll): void {
    if (this.isAcceptButtonDisabled(course)) {
      return; // Disable the accept button
      
    }

    course.status = 'accepted';
    this.updateEnroll(course);
  }

  rejectStatus(course: Enroll): void {
    course.status = 'rejected';
    this.updateEnroll(course);
  }

  private updateEnroll(course: Enroll): void {
    this.enrollService.updateEnroll(course).subscribe(
      (response) => {
        console.log('Enroll updated successfully:', response);
      },
      (error) => {
        console.log('Error updating enroll:', error);
      }
    );
  }
}
