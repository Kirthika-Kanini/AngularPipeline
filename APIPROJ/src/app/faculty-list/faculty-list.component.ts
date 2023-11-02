import { Component, OnInit } from '@angular/core';
import { Faculty } from '../Faculty';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {
  Faculties: Faculty[] = [];
  selectedFaculty: Faculty | null = null;

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.getAllFaculties();
  }

  getAllFaculties(): void {
    this.facultyService.getData().subscribe(data => {
      this. Faculties = data;
    });
  }
  openModal(faculty: Faculty): void {
    this.selectedFaculty = faculty;
  }

  closeModal(): void {
    this.selectedFaculty = null;
  }
}
