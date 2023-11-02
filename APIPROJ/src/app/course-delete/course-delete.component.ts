import { Component, OnInit } from '@angular/core';
import { Course } from '../Course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css']
})
export class CourseDeleteComponent implements OnInit {
  courseId: number=0;
  Course?:Course;
  constructor(private stuser: CourseService) {}

  ngOnInit(): void {
    const url = window.location.href;
    const id = parseInt(url.split('/').pop() || '');
    this.courseId = id;
    console.log(id);
  }

  deleteCourse(courseId: number): void {
    this.stuser.deleteData(courseId)
      .subscribe(
        () => {
          console.log('Student deleted successfully.');
        },
        error => {
          console.log('Failed to delete student:', error.message);
          
        }
      );
  }
}
