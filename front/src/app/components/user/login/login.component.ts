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

  model = {
    email: '',
    password: ''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages:string;

  ngOnInit() {
    if (this.userServices.isLoggedIn()) {
      this.router.navigateByUrl('/userProfile');
    }
  }

  onSubmit(form:NgForm) {
    this.userServices.login(form.value).subscribe(
      res => {
        this.userServices.setToken(res['token']);
        this.router.navigateByUrl('/userProfile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}