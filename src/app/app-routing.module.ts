import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  {path:"", redirectTo:"/sign-up", pathMatch:'full'},
  {path:'sign-up', component:SignUpComponent},
  {path:"login", component:LoginComponent},
  {path:'dashboard/:id', component: UserPageComponent},
  {path:'verify-email-address', component:VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
