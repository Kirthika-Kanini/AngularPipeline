import { Component, EventEmitter, Output } from '@angular/core';
import { FacultyService } from '../faculty.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facultypost',
  templateUrl: './facultypost.component.html',
  styleUrls: ['./facultypost.component.css']
})
export class FacultypostComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitFacultyForm = new EventEmitter<any>();
  successMessage: boolean = false;
  errorMessage: string = '';
  newFaculty: any = {
    facultyName: '',
    facultyDesignation: '',
    facultyDept: '',
    facultymail: '',
    facultySalary: '',
     course: {
      courseId: 0
     }
  };


  constructor(private stockService: FacultyService, private route: ActivatedRoute,private router:Router) {}

 

  submitForm(facultyForm: any): void {
    if (facultyForm.valid) {
      this.stockService.addFaculty(this.newFaculty).subscribe(
        () => {
          console.log('Faculty added successfully');
          this.submitFacultyForm.emit(this.newFaculty);
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
            this.router.navigateByUrl('/facultyview')
          }, 3000);
        },
        (error: any) => {
          console.error('Error adding faculty:', error);

          if (error?.error?.errors) {
            this.errorMessage = error.error.errors;
          }
        }
      );
    }
  }

  ngOnInit(): void {
     // alert("Hello "+localStorage.getItem('userfaculty'));


     const adminName: string | null = localStorage.getItem('adminName');
    const userStudent: string | null = localStorage.getItem('userstudent');

    let username: string | null = null;

    if (userStudent ) {
      username = userStudent;
      this.router.navigateByUrl('/forbidden')
    } 
    else if(adminName){
      username = adminName;
      this.router.navigateByUrl('/forbidden')
    }
    this.route.queryParams.subscribe(params => {
      const courseId = params['courseId'];
      this.newFaculty.course.courseId = courseId;

    });
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/facultyview')
  }
}
