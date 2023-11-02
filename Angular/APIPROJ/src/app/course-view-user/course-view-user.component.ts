import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Course } from '../Course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-view-user',
  templateUrl: './course-view-user.component.html',
  styleUrls: ['./course-view-user.component.css']
})
export class CourseViewUserComponent {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  searchTerm: string = '';
  filteredCourses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getData().subscribe(data => {
      this.courses = data;
      this.filteredCourses = this.courses;
    });
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
}
