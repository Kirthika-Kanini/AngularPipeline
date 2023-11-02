import { Injectable } from '@angular/core';
import { Faculty } from './Faculty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  constructor(private http: HttpClient) { }
  
  getData(): Observable<Faculty[]> {
    const tokenString = localStorage.getItem('token');
    const tokenObject = JSON.parse(tokenString || '{}');
    console.log("TO: " +tokenObject)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenObject.token}`);
    console.log(headers)
    
    return this.http.get<Faculty[]>('https://localhost:7098/api/Faculties',{ headers });
  }

  getDatabyId(facultyId: number): Observable<Faculty> {
    return this.http.get<Faculty>(`https://localhost:7098/api/Faculties/${facultyId}`);
  }
  
  // postData(formData: FormData): Observable<Faculty> {
  //   return this.http.post<Faculty>('https://localhost:7098/api/Faculties', formData).pipe(
  //     map(response => response as Faculty)
  //   );
  // }
 

  addFaculty(faculty: Faculty): Observable<any> {
    
    return this.http.post<any>('https://localhost:7098/api/Faculties',faculty);
  }

  updateFacultyList(facultyId: number, faculty: Faculty): Observable<any> {
    const url = `https://localhost:7098/api/Faculties/${facultyId}`;
    return this.http.put<any>(url, faculty);
  }
  deleteData(facultyId: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7098/api/Faculties/${facultyId}`);
  }

}
