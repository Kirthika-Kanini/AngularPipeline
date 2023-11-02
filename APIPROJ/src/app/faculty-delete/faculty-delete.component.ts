import { Component, OnInit } from '@angular/core';
import { Faculty } from '../Faculty';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-delete',
  templateUrl: './faculty-delete.component.html',
  styleUrls: ['./faculty-delete.component.css']
})
export class FacultyDeleteComponent implements OnInit {
  facultyId: number=0;
  Faculty?:Faculty;
  constructor(private stuser: FacultyService) {}

  ngOnInit(): void {
    const url = window.location.href;
    const id = parseInt(url.split('/').pop() || '');
    this.facultyId = id;
    console.log(id);
  }
  
  deleteCourse( facultyId: number): void {
    this.stuser.deleteData(facultyId)
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
