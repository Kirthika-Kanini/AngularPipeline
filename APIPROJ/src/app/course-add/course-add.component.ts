// import { Component, OnInit } from '@angular/core';
// import { Course } from '../Course';
// import { CourseService } from '../course.service';

// @Component({
//   selector: 'app-course-add',
//   templateUrl: './course-add.component.html',
//   styleUrls: ['./course-add.component.css']
// })
// export class CourseAddComponent implements OnInit {

//   newData: Course = {
//     courseName: '', courseEmail: '', couImagePath: '',
//     coursePassword: '',
//     courseDescription: '',
//     courseType: '',
//     courseDuration: '',
//     courseEnrollment: 0
//   };
//   selectedFile: File | null = null;

//   constructor(private stuser: CourseService) {}

//   ngOnInit(): void {}

//   onFileSelected(event: any): void {
//     this.selectedFile = event.target.files[0];
//   }

//   addStudent(): void {
//     if (this.newData.courseName && this.newData.courseEmail && this.selectedFile) {
//       const formData = new FormData();
//       formData.append('imageFile', this.selectedFile);
//       formData.append('courseName', this.newData.courseName);
//       formData.append('courseEmail', this.newData.courseEmail);
//       formData.append('couImagePath', ''); // Add an empty value for the ImagePath field

//       this.stuser.postData(formData, this.newData).subscribe(
//         (course: Course) => {
//           console.log('Student added successfully');
//           // Reset form and file input
//           this.newData = { courseName: '', courseEmail: '', couImagePath: '',coursePassword: '',
//           courseDescription: '',
//           courseType: '',
//           courseDuration: '',
//           courseEnrollment: 0 };
//           this.selectedFile = null;
//         },
//         (error: any) => {
//           console.error('Error adding student:', error);

//           if (error?.error?.errors) {
//             // Log the validation errors
//             console.log('Validation errors:', error.error.errors);
//           }
//         }
//       );
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../Course';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  studentForm!: FormGroup;
  newData: Course = {
    courseName: '',

    couImagePath: '',
    courseDescription: '',
    courseType: '',
    courseDuration: '',
    courseOverview:''
  };
  selectedFile: File | null = null;
  successMessage: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private stuser: CourseService,private router:Router) {}

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
    this.studentForm = this.formBuilder.group({
      courseName: ['', Validators.required],
   
      courseDescription: ['', Validators.required],
      courseType: ['', Validators.required],
      courseDuration: ['', Validators.required],
      courseOverview: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addStudent(): void {
    if (this.studentForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('imageFile', this.selectedFile);
      formData.append('courseName', this.studentForm.value.courseName);
      formData.append('couImagePath', '');
      formData.append('courseDescription', this.studentForm.value.courseDescription);
      formData.append('courseType', this.studentForm.value.courseType);
      formData.append('courseDuration', this.studentForm.value.courseDuration);
      formData.append('courseOverview', this.studentForm.value.courseOverview);

      this.stuser.postData(formData).subscribe(
        (course: Course) => {
          console.log('Student added successfully');
          this.studentForm.reset();
          this.selectedFile = null;
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
            this.router.navigateByUrl('/courses')
          }, 3000);
        },
        (error: any) => {
          console.error('Error adding student:', error);

          if (error?.error?.errors) {
            this.errorMessage = error.error.errors;
          }
        }
      );
    } else {
      this.errorMessage = 'Please enter the specified details.';
    }
  }

  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/courses')
  }
}
