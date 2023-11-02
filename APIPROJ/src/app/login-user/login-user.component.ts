import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  successMessage: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService,private router:Router) { }
  ngOnInit() {
    
  }

  login(facultyName: string, facultyPassword: string): void {
    this.authService.signIn(facultyName, facultyPassword).subscribe(
   response => {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
      localStorage.setItem('userfaculty', facultyName);
         const token = response; 
         console.log(token);
         const tokenString = JSON.stringify(token);
         localStorage.setItem('token', tokenString);
         this.router.navigateByUrl('/facultyview');
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
    this.router.navigateByUrl('/adminlogin')
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    window.scrollTo(0, 0);
  }
}
