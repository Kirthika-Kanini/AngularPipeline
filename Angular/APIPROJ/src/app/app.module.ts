import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseUpdateComponent } from './course-update/course-update.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultypostComponent } from './facultypost/facultypost.component';
import { FacultyUpdateComponent } from './faculty-update/faculty-update.component';
import { FacultyDeleteComponent } from './faculty-delete/faculty-delete.component';
import { StudentPostComponent } from './student-post/student-post.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { StudentPortalComponent } from './student-portal/student-portal.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { SafeUrlPipe } from 'src/safe-url-pipe';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { FacultyViewComponent } from './faculty-view/faculty-view.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { CourseViewUserComponent } from './course-view-user/course-view-user.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { EnrolledUserSideComponent } from './enrolled-user-side/enrolled-user-side.component';
import { EnrolledAdminSideComponent } from './enrolled-admin-side/enrolled-admin-side.component';
import { LogoutUserComponent } from './logout-user/logout-user.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { FacultyRegisterComponent } from './faculty-register/faculty-register.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SliderComponent } from './slider/slider.component';
import { NavbarMainComponent } from './navbar-main/navbar-main.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseUpdateComponent,
    CourseDeleteComponent,
    FacultyListComponent,
    FacultypostComponent,
    FacultyUpdateComponent,
    FacultyDeleteComponent,
    StudentPostComponent,
    StudentListComponent,
    StudentUpdateComponent,
    StudentDeleteComponent,
    StudentPortalComponent,
    AdminPortalComponent,
    CourseViewComponent,
    SafeUrlPipe,
    LoginUserComponent,
    LoginAdminComponent,
    FacultyViewComponent,
    StudentViewComponent,
    CourseViewUserComponent,
    NavbarUserComponent,
    EnrolledUserSideComponent,
    EnrolledAdminSideComponent,
    LogoutUserComponent,
    LoginStudentComponent,
    AdminRegisterComponent,
    FacultyRegisterComponent,
    StudentRegisterComponent,
    ForbiddenComponent,
    SliderComponent,
    NavbarMainComponent,
  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
