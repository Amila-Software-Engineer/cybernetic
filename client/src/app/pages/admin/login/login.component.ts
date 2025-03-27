import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../entity/user';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  alreadyHaveAccount: boolean = true;;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router

  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async authenticate() {
    if (this.loginForm.valid) {
      const user: User = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      try {
        
        const response = await this.authService.login(user);
        console.log(response);
        
        if (response) {
         
          alert('Login successful');
          localStorage.setItem("lsmtoken", response.token)
          this.router.navigateByUrl('/layout')
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    } else {
      alert('Username or Password is invalid');
    }
  }

  async signup() {
    if (this.loginForm.valid) {
      const user: User = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      try {
        
        const response = await this.authService.register(user);
      
        
        if (response) {
         
          alert('User Registered successfully');
          this.loginForm.reset();
          this.alreadyHaveAccount= true;
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error ', error);
      }
    } else {
      alert('Username or Password is invalid');
    }
  }

  toggleAccount() {
    this.alreadyHaveAccount = !this.alreadyHaveAccount; 
  }
}
