import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(
    // private authService: AuthService,
    private router:Router

  ) {
    // this.loginForm = this.fb.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }

   logout() {
     
      alert('Are you sure you want to log out');
      localStorage.removeItem("lsmtoken");
      this.router.navigateByUrl('/login')
          
   }
}
