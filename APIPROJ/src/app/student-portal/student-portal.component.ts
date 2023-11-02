import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../Course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-portal',
  templateUrl: './student-portal.component.html',
  styleUrls: ['./student-portal.component.css']
})
export class StudentPortalComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) { }


  ngOnInit(): void {
  }



  isUserSideRoute(): boolean {
    return this.router.url.includes('/userlogin') || this.router.url.includes('/adminlogin');
  }

}
