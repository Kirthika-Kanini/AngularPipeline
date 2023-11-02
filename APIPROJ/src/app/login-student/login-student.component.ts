import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  successMessage: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService,private router:Router) { }
  ngOnInit() {
    
  }

  login(studentName: string, studentPassword: string): void {
    this.authService.signInStudent(studentName, studentPassword).subscribe(
   response => {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
      localStorage.setItem('userstudent', studentName);
      const token = response; 
      console.log(token);
      const tokenString = JSON.stringify(token);
      localStorage.setItem('token', tokenString);
      this.router.navigateByUrl('/courseviewuser');
    }, 3000);
        
       
    },
      error => {
        console.log(error);
        if (error?.error?.errors) {
          this.errorMessage = error.error.errors;
        }
      }
    );
  }
  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/courseviewuser')
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    window.scrollTo(0, 0);
  }
}
