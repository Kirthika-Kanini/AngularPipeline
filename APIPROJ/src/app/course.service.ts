import { Injectable } from '@angular/core';
import { Course } from './Course';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

   constructor(private http:HttpClient) { }
  
  getData():Observable<Course[]>
  {
   
    return this.http.get<Course[]>('https://localhost:7098/api/Course');
  }
  getDatabyId(courseId: number): Observable<Course> {
    return this.http.get<Course>(`https://localhost:7098/api/Course/${courseId}`);
  }
  
  // postData(formData: FormData, course: Course): Observable<Course> {
  //   return this.http.post<Course>('https://localhost:7098/api/Course', formData).pipe(
  //     map(response => response as Course)
  //   );
  // }
  postData(formData: FormData): Observable<Course> {
    
    return this.http.post<Course>('https://localhost:7098/api/Course', formData).pipe(
      map(response => response as Course)
    );
  }
  putData(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`https://localhost:7098/api/Course/${id}`, course);
  }
  
  deleteData(courseId: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7098/api/Course/${courseId}`);
  }
  // searchCourses(searchTerm: string): Observable<any> {
  //   const url = `https://localhost:7098/api/Course/search/${searchTerm}`;
  //   return this.http.get(url);
  // }
}
