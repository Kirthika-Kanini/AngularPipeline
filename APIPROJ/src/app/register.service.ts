import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStudent } from './UserStudent';
import { Observable } from 'rxjs';
import { UserFaculty } from './UserFaculty';
import { Admin } from './Admin';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  PostAdmin(admin: Admin): Observable<any> {
    return this.http.post<any>('https://localhost:7098/api/Admins',admin);
  }
   PostStudent(userstudent: UserStudent): Observable<any> {
     return this.http.post<any>('https://localhost:7098/api/UserStudents',userstudent);
   }
   PostFaculty(userfaculty: UserFaculty): Observable<any> {
    return this.http.post<any>('https://localhost:7098/api/UserFaculties',userfaculty);
  }
}
