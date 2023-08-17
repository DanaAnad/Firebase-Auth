import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import User from "../services/user";
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;
  SendVerificationMail: any;
  private user: any;

  constructor(
    public afs:AngularFirestore,
    public afAuth:AngularFireAuth,
    public router:Router,
    public ngZone:NgZone
  ) { 
/* Saving user data in localstorage when 
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe((user) => {
      if(user){
        console.log("userSignIn:", user);
        this.userData=user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user")!);
      } else {
        localStorage.setItem("user", 'null');
        JSON.parse(localStorage.getItem("user")!);
      }
    });
  };

//SignUp with email and pass

  SignUp(email:string, pass:string){
    return this.afAuth
    .createUserWithEmailAndPassword(email, pass)
    .then((result) => {
      //send the verification email when user signs up
      this.sendVerificationMail();
      this.SetUserData(result.user);
    })
    .catch((error)=> {
      window.alert(error.message);
    });
  };

//Sign-in with email and pass


  SignIn(email:string, pass:string):Observable<any>{
    return from ( this.afAuth.signInWithEmailAndPassword(email,pass)
    .then((result) => {
      this.SetUserData(result.user);
      console.log("user", this.userData);
      this.afAuth.authState.subscribe((user) => {
        if(user && user.uid){
          this.user=user;
          this.router.navigate(['dashboard', user.uid]);
        }
      });
    })
    .catch((error) => {
      window.alert(error.message);
    })
    ); 
  };

  //get user details for user page
  getUserDetails(){
    return this.user;
  }


//send verication email for new user that signs up 

  sendVerificationMail(){
    return this.afAuth.currentUser
    .then((u:any) => 
      u.sendEmailVerification())
      .then(()=> {
        this.router.navigate(['verify-email-address']);
      });
  }

  SetUserData(user:any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData:User ={
      uid:user.uid,
      email:user.email,
      emailVerified:user.emailVerified
    };
    return userRef.set(userData, {
      merge:true,
    });
  };

  SignOut(){
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  };

  signInWithMicrosoft(){
    const auth = getAuth();
    const provider = new OAuthProvider('microsoft.com');
    signInWithPopup(auth, provider)
    .then((result)=>{
      console.log("resultMicrostftUser::", result);
      const credential = OAuthProvider.credentialFromResult(result);
      this.user = result.user;
      this.router.navigate(["/dashboard", result.user.uid]);
    })
    .catch((error) => {
      window.alert(error.message);
      console.log(error.message);
    })
  }
}