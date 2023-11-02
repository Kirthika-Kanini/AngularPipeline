import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Enroll } from './Enroll';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  constructor(private http: HttpClient) { }

  getEnrolls(): Observable<Enroll[]> {
    return this.http.get<Enroll[]>('https://localhost:7098/api/Enrolls');
  }

  getEnrollById(enrollId: number): Observable<Enroll> {
    return this.http.get<Enroll>(`https://localhost:7098/api/Enrolls/${enrollId}`);
  }

  addEnroll(enroll: Enroll): Observable<any> {
    return this.http.post<any>('https://localhost:7098/api/Enrolls', enroll);
  }

  updateEnroll(course: Enroll): Observable<any> {
    const url = `https://localhost:7098/api/Enrolls/${course.userId}`;
    return this.http.put<any>(url, course);
  }

  deleteEnroll(enrollId: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7098/api/Enrolls/${enrollId}`);
  }

  getEnrollByUsernameAndCourse(username: string, courseId: number): Observable<Enroll | null> {
    const params = new HttpParams()
      .set('username', username)
      .set('courseId', courseId.toString());

    return this.http.get<Enroll[]>('https://localhost:7098/api/Enrolls', { params })
      .pipe(
        map((enrolls: Enroll[]) => {
          if (enrolls.length > 0) {
            return enrolls[0];
          } else {
            return null;
          }
        })
      );
  }
  
}
