
export interface Faculty {
    facultyId?: number;
    facultyName: string;
    facultyDesignation: string;
    facultyDept: string;
    facultymail: string;
    facultySalary: string;
     course: {
      courseId: number;
      courseName?:string;
     }

  }
  