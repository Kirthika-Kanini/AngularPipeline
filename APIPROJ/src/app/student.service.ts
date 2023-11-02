import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  [x: string]: any;

  constructor(private http: HttpClient) { }
  getData(): Observable<Student[]> {
    return this.http.get<Student[]>('https://localhost:7098/api/Student');
  }

  getDatabyId(studentId: number): Observable<Student> {
    return this.http.get<Student>(`https://localhost:7098/api/Student/${studentId}`);
  }
  
  // postData(formData: FormData): Observable<Faculty> {
  //   return this.http.post<Faculty>('https://localhost:7098/api/Faculties', formData).pipe(
  //     map(response => response as Faculty)
  //   );
  // }
 

  addStudent(student: Student): Observable<any> {
    return this.http.post<any>('https://localhost:7098/api/Student',student);
  }

  updateStudentList(studentId: number, student: Student): Observable<any> {
    const url = `https://localhost:7098/api/Student/${studentId}`;
    return this.http.put<any>(url, student);
  }
  deleteData(studentId: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7098/api/Student/${studentId}`);
  }

}
