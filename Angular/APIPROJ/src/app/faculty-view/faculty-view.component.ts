import { Component } from '@angular/core';
import { Faculty } from '../Faculty';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-view',
  templateUrl: './faculty-view.component.html',
  styleUrls: ['./faculty-view.component.css']
})
export class FacultyViewComponent {
  Faculties: Faculty[] = [];
  selectedFaculty: Faculty | null = null;
  name=localStorage.getItem('userfaculty');
  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
   
    this.getAllFaculties();
   // alert("Hello "+localStorage.getItem('userfaculty'));
  }

  getAllFaculties(): void {
    const userFaculty = localStorage.getItem('userfaculty');
    this.facultyService.getData().subscribe(data => {
      this.Faculties = data.filter(faculty => faculty.facultyName === userFaculty);
    });
  }
  
  openModal(faculty: Faculty): void {
    this.selectedFaculty = faculty;
  }

  closeModal(): void {
    this.selectedFaculty = null;
  }
}
