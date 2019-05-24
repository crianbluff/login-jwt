import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService:UserService, private router:Router) { }

  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):boolean {
      // Verifica si no estoy logeado
      if (!this.userService.isLoggedIn()) {
        // En caso de no estar logeado me redirecciona al login, me elimina el token del local storage y me retorna falso
        this.router.navigateByUrl('login');
        this.userService.deleteToken();
        return false;
      }
      // Si estoy logeado me retorna verdadero
      return true;
    }
}