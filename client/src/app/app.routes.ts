import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { CoursesComponent } from './pages/admin/courses/courses.component';

export const routes: Routes = [
    {path:"", redirectTo:"login", pathMatch:'full'},
    {path:"login", component:LoginComponent},
    {path:"", component:LayoutComponent, children:[
        {path:"dashboard", component:CoursesComponent},
    ]}
];
