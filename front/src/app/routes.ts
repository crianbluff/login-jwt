import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserComponent } from './components/user/user.component';

export const appRoutes:Routes = [
	{
		path: 'register',
    component: UserComponent,
    children: [{
      path: '',
      component: RegisterComponent
    }]
  },

  {
		path: 'login',
    component: UserComponent,
    children: [{
      path: '',
      component: LoginComponent
    }]
  },

  {
		path: 'userProfile',
    component: UserProfileComponent,
    canActivate:[AuthGuardService]
  },

	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'login'
	}
];