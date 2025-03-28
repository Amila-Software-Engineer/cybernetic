import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { User } from '../entity/user';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  private decodedToken: any;


  async register(user: User): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:5000/api/v1/auth/register', user).toPromise();
  }
  async login(user: User): Promise<any|undefined>{
    return this.http.post<[]>('http://localhost:5000/api/v1/auth/login', user).toPromise();
  }


  // setDecodedToken(token: any) {
  //   this.decodedToken = token;
  // }

  async getDecodedToken() {
    const token = localStorage.getItem('lsmtoken');
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
    return this.decodedToken;
  }

  // clearToken() {
  //   this.decodedToken = null;
  // }

}
