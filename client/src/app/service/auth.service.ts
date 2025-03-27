import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  async register(user: User): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:5000/api/v1/auth/register', user).toPromise();
  }
  async login(user: User): Promise<any|undefined>{
    return this.http.post<[]>('http://localhost:5000/api/v1/auth/login', user).toPromise();
  }

}
