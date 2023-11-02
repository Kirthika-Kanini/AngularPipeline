import { Component, EventEmitter, Output } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-post',
  templateUrl: './student-post.component.html',
  styleUrls: ['./student-post.component.css']
})
export class StudentPostComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitStudentForm = new EventEmitter<any>();
  successMessage: boolean = false;
  errorMessage: string = '';
  newStudent: any = {
    studentName:'',
    studentGender:'',
    studentDept:'',
    studentMail:'',
    studentPhone:'',
    course: {
      courseId:0
  }
  };


  constructor(private stockService: StudentService,private route: ActivatedRoute,private router:Router) {}



  submitForm(studentForm: any): void {
    if (studentForm.valid) {
      this.stockService.addStudent(this.newStudent).subscribe(
        () => {
          console.log('Student added successfully');
          this.submitStudentForm.emit(this.newStudent);
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
            this.router.navigateByUrl('/studentview')
          }, 3000);
        },
        (error: any) => {
          console.error('Error adding Student:', error);

          if (error?.error?.errors) {
            this.errorMessage = error.error.errors;
          }
        }
      );
    }
  }
  
  ngOnInit(): void {
    const adminName: string | null = localStorage.getItem('adminName');
    const userFaculty: string | null = localStorage.getItem('userfaculty');

    let username: string | null = null;

    if (userFaculty ) {
      username = userFaculty;
      this.router.navigateByUrl('/forbidden')
    } 
    else if(adminName){
      username = adminName;
      this.router.navigateByUrl('/forbidden')
    }
    this.route.queryParams.subscribe(params => {
      const courseId = params['courseId'];
      this.newStudent.course.courseId = courseId;
    });
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/studentview')
  }
}
