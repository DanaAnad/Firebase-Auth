import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit{
  user: any;
  constructor(
    private route: ActivatedRoute,
    public authService:AuthService){}
  ngOnInit(){
    this.user =this.authService.getUserDetails();
    console.log("user::", this.user);
    }
  }

