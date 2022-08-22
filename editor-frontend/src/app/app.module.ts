import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotificationComponent } from './notification/notification.component';
import {AuthGuard} from "./security/auth.guard";
import {AuthGuardLoggedIn} from "./security/auth.guard.loggedIn";
import { SurveyComponent } from './survey/survey.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SurveyDisplayComponent } from './survey-display/survey-display.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardLoggedIn]},
  {path: 'signup', component: SignUpComponent, canActivate: [AuthGuardLoggedIn]},
  {path: "survey", component: SurveyComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},


]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    NotificationComponent,
    SurveyComponent,
    QuestionFormComponent,
    SurveyDisplayComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthGuardLoggedIn],
  exports: [
    SurveyDisplayComponent,
    NotificationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
