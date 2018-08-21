import {  Routes } from "../node_modules/@angular/router";
import { AuthSignupComponent } from "./app/auth-signup/auth-signup.component";
import { AuthLoginComponent } from "./app/auth-login/auth-login.component";
import { RecoListComponent } from "./app/reco-list/reco-list.component";
import { ProfileComponent } from "./app/profile/profile.component";
import { isLoggedGuardService } from "./services/authGuard.service";
import { HomeComponent } from "./app/home/home.component";
import { RecoViewComponent } from "./app/reco-view/reco-view.component";
import { EditProfileComponent } from "./app/edit-profile/edit-profile.component";
import { EditRecoComponent } from "./app/edit-reco/edit-reco.component";
import { isNotLoggedGuardService } from "./services/noAuthGuard.service";


export const routes:Routes =[
    {path:"",component:AuthLoginComponent,canActivate:[isNotLoggedGuardService]},

    {path:"signup",component:AuthSignupComponent,canActivate:[isNotLoggedGuardService]},
    {path:"login",component:AuthLoginComponent,canActivate:[isNotLoggedGuardService]},
    {path:"profile/:id",component:ProfileComponent,canActivate:[isLoggedGuardService]},
    {path:"profile/:id/edit",component:EditProfileComponent,canActivate:[isLoggedGuardService]},

    {path:"recos/reco/:id",component:RecoViewComponent,canActivate:[isLoggedGuardService]},
    

    {path:"recos/:category",component:RecoListComponent,canActivate:[isLoggedGuardService]},
    
    {path:"home",component:HomeComponent,canActivate:[isLoggedGuardService]},
    { path: '**', redirectTo: '' }

]