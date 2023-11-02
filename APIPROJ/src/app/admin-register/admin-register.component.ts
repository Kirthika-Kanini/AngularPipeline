import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../Admin';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  adminForm: FormGroup;
  successMessage: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private router:Router
  ) {
    this.adminForm = this.formBuilder.group({
      AdminName: ['', Validators.required],
      CourseEmail: ['', [Validators.required, Validators.email]],
      CoursePassword:['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]]
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    window.scrollTo(0, 0);
  }

  createAdmin() {
    if (this.adminForm.invalid) {
      return;
    }

    const admin: Admin = this.adminForm.value;

    this.register.PostAdmin(admin).subscribe(
      response => {
        console.log('Admin registered successfully:', response);
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
          this.router.navigateByUrl('/adminlogin')
        }, 3000);
      },
      error => {
        console.error('Error registering admin:', error);
        if (error?.error?.errors) {
          this.errorMessage = error.error.errors;
        }
      }
    );
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/adminlogin')
  }
}
