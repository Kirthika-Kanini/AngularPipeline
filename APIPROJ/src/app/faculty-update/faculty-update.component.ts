import { Component, OnInit } from '@angular/core';
import { Faculty } from '../Faculty';
import { FacultyService } from '../faculty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-update',
  templateUrl: './faculty-update.component.html',
  styleUrls: ['./faculty-update.component.css']
})
export class FacultyUpdateComponent implements OnInit {
  successMessage: boolean = false;
  errorMessage: string = '';
  facultyId!: number;
  faculty: Faculty = {
    facultyName: '',
    facultyDesignation: '',
    facultyDept: '',
    facultymail: '',
    facultySalary: '',
    course: {
      courseId: 0
    }
  };

  constructor(private facultyService: FacultyService,private router:Router) {}

  ngOnInit(): void {
    const url = window.location.href;
    const id = parseInt(url.split('/').pop() || '');
    this.facultyId = id;
    console.log(id);
    this.getFacultyById();
  }

  updateFaculty(): void {
    if (this.facultyId !== undefined) {
      this.facultyService.updateFacultyList(this.facultyId, this.faculty).subscribe(
        (updatedFaculty: any) => {
          console.log('Faculty updated successfully');
          this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
          this.router.navigateByUrl('/facultyview');
        }, 3000);
          // Handle success response if needed
        },
        (error: any) => {
          console.error('Error updating Faculty:', error);
          if (error?.error?.errors) {
            this.errorMessage = error.error.errors;
          }
          // Handle error response if needed
        }
      );
    }
  }

  getFacultyById(): void {
    if (this.facultyId !== undefined) {
      this.facultyService.getDatabyId(this.facultyId).subscribe(data => {
        this.faculty = data;
  
        this.faculty.course = {
          courseId: data.course ? data.course.courseId : 0
        };
      });
    }
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/facultyview');
  }
}
