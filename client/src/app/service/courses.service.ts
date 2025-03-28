import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../entity/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }

  async addCourse(course: Course): Promise<any|undefined>{
    return this.http.post<Course>('http://localhost:5000/api/v1/courses', course).toPromise();
  }
  async viewAll(): Promise<Course[]|undefined>{
    return this.http.get<any>('http://localhost:5000/api/v1/courses/viewall',).toPromise();
  }

  async updateCourse(courseId: number, course: Course): Promise<any | undefined> {
    return this.http.put<Course>(`http://localhost:5000/api/v1/courses/${courseId}`, course).toPromise();
  }

  async deleteCourse(courseId: number): Promise<any | undefined> {
    return this.http.delete(`http://localhost:5000/api/v1/courses/${courseId}`).toPromise();
  }
 

}
