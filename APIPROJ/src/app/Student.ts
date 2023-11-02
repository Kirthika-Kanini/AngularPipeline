export interface Student {
  studentId?: number;
  studentName: string;
  studentGender: string;
  studentDept: string;
  studentMail: string;
  studentPhone: string;
  course: {
    courseId:number;
    courseName?:string;
}
}

