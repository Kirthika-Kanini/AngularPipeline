import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent implements OnInit {
  studentId: number=0;
  Student?:Student;
  constructor(private stuser: StudentService) {}

  ngOnInit(): void {
    const url = window.location.href;
    const id = parseInt(url.split('/').pop() || '');
    this.studentId = id;
    console.log(id);
  }
  
  deleteStudent( studentId: number): void {
    this.stuser.deleteData( studentId)
      .subscribe(
        () => {
          console.log('Student deleted successfully.');
          // Perform any additional actions after deletion
        },
        error => {
          console.log('Failed to delete student:', error.message);
          // Handle error scenario
        }
      );
  }
}
