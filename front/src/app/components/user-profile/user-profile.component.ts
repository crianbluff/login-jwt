import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  constructor(private userService:UserService, private router:Router, private global:GlobalsService) { }

  ngOnInit() {

  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['login']);
  }

}