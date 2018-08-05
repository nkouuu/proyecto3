import {  Routes } from "../node_modules/@angular/router";
import { AuthSignupComponent } from "./app/auth-signup/auth-signup.component";
import { AuthLoginComponent } from "./app/auth-login/auth-login.component";
import { RecoListComponent } from "./app/reco-list/reco-list.component";
import { ProfileComponent } from "./app/profile/profile.component";
import { isLoggedGuardService } from "./services/authGuard.service";
import { HomeComponent } from "./app/home/home.component";
import { RecoViewComponent } from "./app/reco-view/reco-view.component";


export const routes:Routes =[
    
    {path:"signup",component:AuthSignupComponent},
    {path:"login",component:AuthLoginComponent},
    {path:"profile/:id",component:ProfileComponent,canActivate:[isLoggedGuardService]},
    {path:"recos/reco/:id",component:RecoViewComponent,canActivate:[isLoggedGuardService]},

    {path:"recos/:category",component:RecoListComponent,canActivate:[isLoggedGuardService]},
    
    {path:"",component:HomeComponent},

]