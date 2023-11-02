import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  successMessage: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService,private router:Router) { }
  ngOnInit() {
    
  }

  login(adminName: string, coursePassword: string): void {
    this.authService.signInAdmin(adminName, coursePassword).subscribe(
   response => {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
      localStorage.setItem('adminName', adminName);
      const token = response; 
      console.log(token);
      const tokenString = JSON.stringify(token);
      localStorage.setItem('token', tokenString);
      this.router.navigateByUrl('/courses');
    }, 3000);
      
       
    },
      error => {
        console.log("Incorrect Credentials");
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
