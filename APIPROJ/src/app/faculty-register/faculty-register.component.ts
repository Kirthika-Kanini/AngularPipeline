import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-register',
  templateUrl: './faculty-register.component.html',
  styleUrls: ['./faculty-register.component.css']
})
export class FacultyRegisterComponent {
  facultyForm: FormGroup;
  successMessage: boolean = false;
  errorMessage: string = '';
  constructor(private formBuilder: FormBuilder, private facultyService: RegisterService,private router:Router) {
    this.facultyForm = this.formBuilder.group({
      username: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]]
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    window.scrollTo(0, 0);
  }

  createFaculty() {
    if (this.facultyForm.valid) {
      const facultyData = {
        FacultyName: this.facultyForm.value.username,
        FacultyPassword: this.facultyForm.value.password,
        FacultyEmail: this.facultyForm.value.useremail
      };

      this.facultyService.PostFaculty(facultyData).subscribe(
        response => {
          // Handle successful response
          console.log(response);
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
            this.router.navigateByUrl('/userlogin')
          }, 3000);
        },
        error => {
          // Handle error
          console.error(error);
          if (error?.error?.errors) {
            this.errorMessage = error.error.errors;
          }
        }
      );
    }
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/userlogin')
  }
}
