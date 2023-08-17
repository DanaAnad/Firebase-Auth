import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {environment} from "src/environments/environment";

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserPageComponent } from './components/user-page/user-page.component';

import { AuthService } from './shared/services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';



initializeApp(environment.firebaseConfig);
const firestore = getFirestore();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    UserPageComponent,
    VerifyEmailComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers:[AuthService,{provide:FIREBASE_OPTIONS, useValue:environment.firebaseConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
