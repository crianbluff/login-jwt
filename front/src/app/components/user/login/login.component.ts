import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userServices:UserService, private router:Router) { }
  
  serverErrorMessages:string;

  //
  model = {
    email: '',
    password: ''
  };

  // Variable para validar el patron de un email valido
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
    // Cuando carga la página me redirecciona al usuario si detecta que estoy logeado
    if (this.userServices.isLoggedIn()) {
      this.router.navigateByUrl('userProfile');
    }
  }

  onSubmit(form:NgForm) {
    // Función para enviar los datos del formulario de login al backend
    this.userServices.login(form.value).subscribe(
      res => {
        // De lo que me responde la api, guarda el token la almacena en el localstorage y me redirecciona a la ruta del usuario    
        this.userServices.setToken(res['token']);
        this.router.navigateByUrl('userProfile');
      },
      err => {
        // Si me devuelve error los almacena en la variable serverErrorMessages
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}