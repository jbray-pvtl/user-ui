import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { HeaderComponent } from './header/header.component';

import { UserService } from './users/user.service';
import { AuthenticateService } from './authenticate.service';
import { ShortenPipe } from './shorten.pipe';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    HeaderComponent,
    ShortenPipe,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
