import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../Course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit{
  successMessage: boolean = false;
  errorMessage: string = '';
  courseId!: number;
  Course?:Course
  course:Course = { 
    courseId: 0,
    courseName: '',
    couImagePath: '',
    courseDescription: '',
    courseType: '',
    courseDuration: '',
    courseOverview:''
  };
  constructor(private stuser: CourseService,private router:Router) {}

  ngOnInit(): void {
    const url = window.location.href;
    const id = parseInt(url.split('/').pop() || '');
    this.courseId = id;
    console.log(id);
    this.getAllById();
  }
  updateCourse(): void {
    if (this.courseId !== undefined) {
      this.stuser.putData(this.courseId, this.course).subscribe(updatedCollege => {
        console.log('Updated Sucessfully', updatedCollege);
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
          this.router.navigateByUrl('/courses');
        }, 3000);
     
      }, (error: any) => {
        console.error('Error adding student:', error);

        if (error?.error?.errors) {
          this.errorMessage = error.error.errors;
        }
      }
      );

   

    }else {
      this.errorMessage = "Error updating";
    }
  }
  
  getAllById(): void {
    if (this.courseId !== undefined) {
      this.stuser.getDatabyId(this.courseId).subscribe(data => {
        this.Course = data;
        this.course = { courseId: data.courseId, courseName: data.courseName,couImagePath:data.couImagePath,
          courseDescription:data.courseDescription,
          courseType: data.courseType,
          courseDuration:data.courseDuration,
          courseOverview:data.courseOverview
         
         };
      });
    }
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/courses');
  }
}
