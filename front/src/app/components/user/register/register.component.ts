import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showSuccessMessage:boolean;
  serverErrorMessages:string;

  // Variable para validar el patron de un email valido
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //
  model = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
    // Cuando carga la página verifica si estoy logeado, en caso de estarlo me redirecciona a la ruta del usuario
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('userProfile');
    }
  };

  onSubmit(form:NgForm) {
    // Función para enviar los datos del formulario de registro al backend
    this.userService.postUser(form.value).subscribe(
      res => {
        // De lo que me responde la api, guarda el token la almacena en el localstorage y me redirecciona a la ruta del usuario
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('userProfile');
      },
      err => {
        // Si me devuelve error los almacena en la variable serverErrorMessages
        this.serverErrorMessages = err.error.message;
      }
    );
  };

}