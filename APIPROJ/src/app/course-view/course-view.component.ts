import { Component, OnInit } from '@angular/core';
import { Course } from '../Course';
import { CourseService } from '../course.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Enroll } from '../Enroll';
import { EnrollService } from '../enroll.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  searchTerm: string = '';
  filteredCourses: Course[] = [];
  enrolledCourses: Enroll[] = [];
  username: string | null = '';

  constructor(
    private courseService: CourseService,
    private enrollService: EnrollService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('userfaculty')) {
      this.username = localStorage.getItem('userfaculty');
    } else if (localStorage.getItem('userstudent')) {
      this.username = localStorage.getItem('userstudent');
    }
    this.getAllCourses();
    this.getEnrolledCourses();
  }

  getAllCourses(): void {
    this.courseService.getData().subscribe(data => {
      this.courses = data;
      this.filteredCourses = this.courses;
    });
  }

  getEnrolledCourses(): void {
    if (this.username) {
      this.enrollService.getEnrolls().subscribe(enrolls => {
        this.enrolledCourses = enrolls.filter(
          enroll => enroll.userName === this.username
        );
      });
    }
  }

  showCourseDetails(course: Course): void {
    this.selectedCourse = course;
  }

  search(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(course =>
        course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  getCourseVideos(course: Course): string[] {
    if (course.courseOverview) {
      return course.courseOverview.split(',').map(url => url.trim());
    }
    return [];
  }

  getSafeVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  isEnrolled(courseId: number | undefined): boolean {
    return this.enrolledCourses.some(enroll => enroll.courseId === courseId);
  }

  enrollCourse(courseId: number | undefined): void {
    if (courseId !== undefined && this.selectedCourse) {
      const { courseName, courseDuration } = this.selectedCourse;

      if (this.isEnrolled(courseId)) {
        console.log('Already enrolled in this course');
        return;
      }

      const enrollData: Enroll = {
        userName: this.username !== null ? this.username : 'Unknown',
        status: 'requested',
        courseId,
        courseName,
        courseDuration,
        acceptCount: 0
      };

      console.log('Enrollment Data:', enrollData);

      this.enrollService.addEnroll(enrollData).subscribe(
        () => {
          window.location.reload();
          console.log('Enrollment added successfully');
          // You can perform additional actions here, such as displaying a success message or navigating to a different page
        },
        error => {
          console.error('Error adding enrollment:', error);
          // You can handle the error here, such as displaying an error message
        }
      );
    } else {
      console.error('Invalid selected course');
    }
  }
}
