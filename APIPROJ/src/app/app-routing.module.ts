import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { CourseUpdateComponent } from './course-update/course-update.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { FacultypostComponent } from './facultypost/facultypost.component';
import { StudentPostComponent } from './student-post/student-post.component';
import { FacultyDeleteComponent } from './faculty-delete/faculty-delete.component';
import { FacultyUpdateComponent } from './faculty-update/faculty-update.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { StudentPortalComponent } from './student-portal/student-portal.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { FacultyViewComponent } from './faculty-view/faculty-view.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { CourseViewUserComponent } from './course-view-user/course-view-user.component';
import { EnrolledUserSideComponent } from './enrolled-user-side/enrolled-user-side.component';
import { EnrolledAdminSideComponent } from './enrolled-admin-side/enrolled-admin-side.component';
import { LogoutUserComponent } from './logout-user/logout-user.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { FacultyRegisterComponent } from './faculty-register/faculty-register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SliderComponent } from './slider/slider.component';

// Import your components for routing


const routes: Routes = [
  { path: 'admin', component: AdminPortalComponent },
  { path: 'user', component: StudentPortalComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'coursesview', component: CourseViewComponent },
  { path: 'facultyview', component: FacultyViewComponent },
  { path: 'studentview', component:StudentViewComponent  },
  { path: 'newfaculty', component: FacultypostComponent },
  { path: 'newcourse', component: CourseAddComponent },
  { path: 'faculties', component: FacultyListComponent },
  { path: 'students', component: StudentListComponent },
  {path:'editcourse/:id',component:CourseUpdateComponent},
  {path:'deletecourse/:id',component:CourseDeleteComponent},
  {path:'editfaculty/:id',component:FacultyUpdateComponent},
  {path:'deletefaculty/:id',component:FacultyDeleteComponent},
  {path:'editstudent/:id',component:StudentUpdateComponent},
  {path:'deletestudent/:id',component:StudentDeleteComponent},
  {path:'newstudent',component:StudentPostComponent},
  {path:'adminlogin',component:LoginAdminComponent},
  {path:'userlogin',component:LoginUserComponent},
  {path:'studentlogin',component:LoginStudentComponent},
  {path:'courseviewuser',component:CourseViewUserComponent},
  {path:'enrolledcourses',component:EnrolledUserSideComponent},
  {path:'enrolledadmcourses',component:EnrolledAdminSideComponent},
  {path:'studentregister',component:StudentRegisterComponent},
  {path:'facultyregister',component:FacultyRegisterComponent},
  {path:'adminregister',component:AdminRegisterComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'logout',component:LogoutUserComponent},
  {path:'home',component:SliderComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
