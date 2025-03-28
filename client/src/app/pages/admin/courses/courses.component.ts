import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { Course } from '../../../entity/course';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import{ MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../../service/courses.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courseForm: FormGroup;
  alreadyHaveAccount: boolean = true;
  displayedColumns: string[] = ['title', 'description', 'actions'];
  COURSE_DATA?: Course[] = [];
  dataSource = new MatTableDataSource<Course>(this.COURSE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar

  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
   
  }

   decodedTok: any;
   role:any;

  ngOnInit() {
    this.initialize();
    

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initialize() {
    this.fetchCourses();
    this.decodedTok = this.authService.getDecodedToken();
    this.role = this.decodedTok.__zone_symbol__value.role;
    
  }


  async addCourse() {
    if (this.courseForm.valid) {
      const course: Course = {
        title: this.courseForm.value.title,
        description: this.courseForm.value.description
      };

      try {
        
        const response = await this.courseService.addCourse(course);
        if (response) {
         console.log(response.message);
         
          alert(response.message);
        } else {
          alert("something");
        }
      } catch (error) {
        alert(error)
        console.error('Failed to Crate course', error);
      }
    } else {
      alert("Form not valid please fill all the fiels before submit")
    }
  }

  async fetchCourses() {
    this.courseService.viewAll().then((courses: Course[] | undefined) => {
      if (courses && courses.length > 0) {
        this.COURSE_DATA = courses; 
        this.dataSource.data = this.COURSE_DATA;
      } else {
        this.COURSE_DATA = [];
        this.dataSource.data = [];
      }
    }).catch(error => {
      console.error('Error fetching courses:', error);
    });
  }


  async editCourse(courseId: number, updatedCourse: Course) {
    try {
      await this.courseService.updateCourse(courseId, updatedCourse);
      this.fetchCourses();
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async deleteCourse(courseId: number) {
    try {
      await this.courseService.deleteCourse(courseId);
      this.fetchCourses(); 
      
    } catch (error) {
      console.log(error);
      
      if (error instanceof HttpErrorResponse) {
    
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error response body:', error.error); 
      } else {
        console.error('An unexpected error occurred:', error);
      }
      
    }
  }

}
