import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // Variable de cabeceras no autorizadas
  noAuthHeader = {
    headers: new HttpHeaders({
      'NoAuth': 'True'
    })
  };

  constructor(private http:HttpClient) { }

  // Http Metodos

  // Registrar Usuario
  postUser (authCredentials) {
    return this.http.post(`${environment.apiBaseUrl}/auth/register`, authCredentials, this.noAuthHeader);
  }

  // Logear Usuario
  login (authCredentials) {
    return this.http.post(`${environment.apiBaseUrl}/auth/login`, authCredentials, this.noAuthHeader);
  }

  // Traer Datos De Usuario
  getUserProfile() {
    return this.http.get(`${environment.apiBaseUrl}/auth/profile`);
  }

  // Helper Methods
  
  // Función que recibe un token para almacenarlo en el localstorage
  setToken (token:string) {
    localStorage.setItem('userToken', token);
  }

  // Función que me devuelve el token que esta almacenado en el localstorage
  getToken() {
    return localStorage.getItem('userToken');
  }

  // Elimina el token que esta almacenado en el localstorage
  deleteToken() {
    localStorage.removeItem('userToken');
  }

  // Función que si existe un token en el localstorage, lo decifra para retornarme los datos del usuario
  getUserPayload() {
    let token = this.getToken();
    if (token) {
      try {
        const userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload); 
      } catch (err) {
          return null;
      }
    } else {
        return null;
      }
  }

  // Función que me verifica si estoy logeado o si no estoy logeado
  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
        return false;
      }
  }
  
}