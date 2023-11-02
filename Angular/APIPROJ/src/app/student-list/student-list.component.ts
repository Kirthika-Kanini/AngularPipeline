import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  Students: Student[] = [];
  selectedStudent: Student | null = null;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents(): void {
    this.studentService.getData().subscribe(data => {
      this.Students = data;      
    });
  }

  openModal(student: Student): void {
    this.selectedStudent = student;
  }

  closeModal(): void {
    this.selectedStudent = null;
  }
}
