import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public authService:AuthService,
    private router:Router
  ) {}
  ngOnInit(){}

  login(email:string, password:string){
    this.authService.SignIn(email, password).subscribe((user) => {
      console.log("userAfLogin::", user);
      const userId= user.uid;
      // this.router.navigate(["dashboard", userId])
    });
  }
}
