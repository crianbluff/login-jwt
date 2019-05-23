import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  noAuthHeader = {
    headers: new HttpHeaders({
      'NoAuth': 'True'
    })
  };

  constructor(private http:HttpClient) { }

  // Http Methods

  postUser (authCredentials) {
    return this.http.post(`${environment.apiBaseUrl}/auth/register`, authCredentials, this.noAuthHeader);
  }

  login (authCredentials) {
    return this.http.post(`${environment.apiBaseUrl}/auth/login`, authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(`${environment.apiBaseUrl}/auth/profile`);
  }

  // Helper Methods

  setToken (token:string) {
    localStorage.setItem('userToken', token);
  }

  // Me devuelve el token
  getToken() {
    return localStorage.getItem('userToken');
  }

  deleteToken() {
    localStorage.removeItem('userToken');
  }

  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
        return null;
      }
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
        return false;
      }
  }
  
}
