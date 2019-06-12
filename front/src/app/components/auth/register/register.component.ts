import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService, private router:Router, private http:HttpClient) { }
  
  serverErrorMessages:string;
  
  // Variable para validar el patron de un email valido
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Modelo del formulario de registro
  model = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    image: ''
  };

  selectedFile:File;

  ngOnInit() {
    // Cuando carga la página verifica si estoy logeado, en caso de estarlo me redirecciona a la ruta del usuario
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('userProfile');
    }
  };

  showAlertError(msgError) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'error',
      title: msgError
    })
  }

  showAlertSuccess(msgSuccess) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'success',
      title: msgSuccess
    })
  }
  
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form:NgForm) {
    // Función para enviar los datos del formulario de registro al backend
    
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/auth/uploads', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(
      res => {
        // Respuesta Subida Imágen
        // console.log(res);
      },
      err => {
        console.log(err);
        this.serverErrorMessages = err.error.message;
        this.showAlertError(this.serverErrorMessages);
      }
    );

    this.userService.postUser(form.value).subscribe(
      res => {
        // De lo que me responde la api, guarda el token la almacena en el localstorage y me redirecciona a la ruta del usuario
        this.userService.setToken(res['token']);
        let nameUser = JSON.parse(atob(res['token'].split('.')[1])).first_name;
        this.router.navigateByUrl('userProfile');
        this.showAlertSuccess(`Logueado ${nameUser}`);
      },
      err => {
        // Si me devuelve error los almacena en la variable serverErrorMessages
        this.serverErrorMessages = err.error.message;
        this.showAlertError(this.serverErrorMessages);
      }
    );
  };

}