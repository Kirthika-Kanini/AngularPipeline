import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  studentForm!: FormGroup;
  successMessage: boolean = false;
  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router:Router
  ) {}

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      username: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)
        ]
      ]
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    window.scrollTo(0, 0);
  }

  createStudent() {
    if (this.studentForm.invalid) {
      return;
    }

    const { username, useremail, password } = this.studentForm.value;

    const userStudent = {
      StudentName: username,
      StudentEmail: useremail,
      StudentPassword: password
    };

    this.registerService.PostStudent(userStudent).subscribe(
      response => {
        console.log('Student registered successfully:', response);
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
          this.router.navigateByUrl('/studentlogin')
        }, 3000);
      },
      error => {
        console.error('Error registering student:', error);
        if (error?.error?.errors) {
          this.errorMessage = error.error.errors;
        }
      }
    );
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/studentlogin')
  }
}
