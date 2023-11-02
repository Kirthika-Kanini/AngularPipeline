import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.css']
})
export class LogoutUserComponent {
  constructor(private router: Router) { }

  ngOnInit() {
    this.logout();
    this.router.navigate(['/home']); // Replace '/login' with the desired route for redirection
  }

  logout() {
    localStorage.removeItem('userfaculty');
    localStorage.removeItem('adminName');

    localStorage.removeItem('userstudent');
    localStorage.removeItem('token');
    localStorage.removeItem('jwtUserToken');
    // Other logout actions
  }
}
