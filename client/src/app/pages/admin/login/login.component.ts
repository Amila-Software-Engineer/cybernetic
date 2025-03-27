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

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService

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
        console.log(user);
        
        const response = await this.authService.login(user);

        if (response) {
          // Handle successful login, e.g., navigate to another page or show a success message
          console.log('Login successful', response);
        } else {
          // Handle login failure, e.g., show an error message
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    } else {
      // Handle form validation errors
      console.error('Form is invalid');
    }
  }

  signup() {

  }
}
