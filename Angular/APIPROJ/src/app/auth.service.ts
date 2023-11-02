import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  
 //User Login 
  signIn(facultyName: string, facultyPassword: string) {
    const signInData = { facultyName, facultyPassword };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'  // Treat the response as plain text
    };

    return this.http.post<string>('https://localhost:7098/api/Token/Faculty', signInData, httpOptions)
      .pipe(
        tap(jwtUserToken => {
          localStorage.setItem('jwtUserToken', jwtUserToken);
        })
      );
  }

  signInAdmin(adminName: string, coursePassword: string) {
    const signInData = { adminName, coursePassword };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'  // Treat the response as plain text
    };

    return this.http.post<string>('https://localhost:7098/api/Token/Course', signInData, httpOptions)
      .pipe(
        tap(jwtUserToken => {
          localStorage.setItem('jwtUserToken', jwtUserToken);
        })
      );
  }

  signInStudent(studentName: string, studentPassword: string) {
    const signInData = { studentName, studentPassword };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'  // Treat the response as plain text
    };

    return this.http.post<string>('https://localhost:7098/api/Token/Student', signInData, httpOptions)
      .pipe(
        tap(jwtUserToken => {
          localStorage.setItem('jwtUserToken', jwtUserToken);
        })
      );
  }
  

  // private fetchTokenFromServer(): Observable<string> {
  //   // Example asynchronous token retrieval using HttpClient
  //   return this.http.get<string>('https://localhost:7098/api/Token/Faculty');
  // }

  getToken()
  {
    return localStorage.getItem('jwtUserToken');
  }

}
