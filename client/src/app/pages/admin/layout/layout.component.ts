import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FooterComponent
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
