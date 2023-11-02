import { Component } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent {
  Students: Student[] = [];
  selectedStudent: Student | null = null;
  name=localStorage.getItem('userstudent');
  constructor(private studentService: StudentService,private router: Router) { }

  ngOnInit(): void {
    this.getAllStudents();
    }

    getAllStudents(): void {
      const userstudent = localStorage.getItem('userstudent');
      this.studentService.getData().subscribe(data => {
        this.Students = data.filter(student => student.studentName === userstudent);
      });
    }

  openModal(student: Student): void {
    this.selectedStudent = student;
  }

  closeModal(): void {
    this.selectedStudent = null;
  }
}
