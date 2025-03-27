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
    private router:Router,
    private snackBar: MatSnackBar

  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }



  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.initialize();
  }

  initialize() {
    this.courseService.viewAll().then((courses: Course[] | undefined) => {
      if (courses && courses.length > 0) {
        console.log('API Response:', courses);
        this.COURSE_DATA = courses; 
        this.dataSource.data = this.COURSE_DATA;
      } else {
        console.warn('No courses received from API.');
        this.COURSE_DATA = [];
        this.dataSource.data = [];
      }
    }).catch(error => {
      console.error('Error fetching courses:', error);
    });
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
          
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    } else {
      alert('Username or Password is invalid');
    }
  }


  editCourse(course: Course) {
    console.log('Edit Course:', course);
    this.snackBar.open(`Editing Course: ${course.title}`, 'Close', { duration: 2000 });
  }

  deleteCourse(id: number) {
    console.log('Delete Course ID:', id);
    this.snackBar.open('Course deleted', 'Undo', { duration: 2000 });
    this.dataSource.data = this.dataSource.data.filter(course => course.id !== id);
  }

}
