// Built In
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Rutas
import { appRoutes } from './routes';

// Componentes
import { AppComponent } from './app.component';
import { UserComponent } from './components/auth/user.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

// Servicios
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { GlobalsService } from './services/globals.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, AuthGuardService, UserService, GlobalsService
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }