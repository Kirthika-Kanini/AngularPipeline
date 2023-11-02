import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../Course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  Courses: Course[] = [];
  selectedCourse: Course | null = null;
  selectedEditCourse: Course | null = null;
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  selectedCardId: number | undefined;
  selectedcourseIdd : Course | undefined = undefined;

  constructor(private courseService: CourseService) { }
  
  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getData().subscribe(data => {
      this.Courses = data;
    });
  }

  openModal(course: Course): void {
    this.selectedCourse = course;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.selectedCourse = null;
    this.isModalOpen = false;
  }

  openEditModal(course: Course): void {
    this.selectedcourseIdd = { ...course };
    this.selectedEditCourse = course;
    this.isEditModalOpen = true;

    this.selectedCardId = course?.courseId;
    console.log('Selected Card ID:', this.selectedCardId);
  }

  closeEditModal(): void {
    this.selectedEditCourse = null;
    this.isEditModalOpen = false;
  }
}
