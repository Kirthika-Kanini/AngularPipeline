import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  successMessage: boolean = false;
  errorMessage: string = '';
  studentId!: number;
  student: Student = {
    studentName: '',
    studentGender: '',
    studentDept: '',
    studentMail: '',
    studentPhone: '',
    course: {
      courseId: 0
    }
  };
  constructor(private studentService: StudentService,private router:Router) {}

  ngOnInit(): void {
    const url = window.location.href;
    const id = parseInt(url.split('/').pop() || '');
    this.studentId = id;
    console.log(id);
    this.getStudentById();
  }

  updateStudent(): void {
    if (this.studentId !== undefined) {
      this.studentService.updateStudentList(this.studentId, this.student).subscribe(
        (updatedStudent: any) => {
          console.log('Student updated successfully');
          this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
          this.router.navigateByUrl('/studentview');
        }, 3000);
          // Handle success response if needed
        },
        (error: any) => {
          console.error('Error updating Student:', error);
          if (error?.error?.errors) {
            this.errorMessage = error.error.errors;
          }
          // Handle error response if needed
        }
      );
    }
  }

  getStudentById(): void {
    if (this.studentId !== undefined) {
      this.studentService.getDatabyId(this.studentId).subscribe(data => {
        this.student = data;
  
        this.student.course = {
          courseId: data.course ? data.course.courseId : 0
        };
      });
    }
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/studentview');
  }
}
