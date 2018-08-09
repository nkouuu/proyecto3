import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SessionService } from '../services/session.service';
import { RouterModule } from '../../node_modules/@angular/router';
import { HttpModule } from '../../node_modules/@angular/http';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { AuthLoginComponent } from './auth-login/auth-login.component'
import { routes } from '../routes';
import {FormsModule} from '@angular/forms'
import { RecosService } from '../services/recos.service';
import { RecoListComponent } from './reco-list/reco-list.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryPipe } from '../pipes/categoryFilter.pipe';
import { HomeComponent } from './home/home.component';
import { isLoggedGuardService } from '../services/authGuard.service';
import { NewRecoComponent } from './new-reco/new-reco.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { UserRecosComponent } from './user-recos/user-recos.component';
import { UsersService } from '../services/users.service';
import { UsersListComponent } from './users-list/users-list.component';
import { RecoViewComponent } from './reco-view/reco-view.component';
import { FileUploadModule} from 'ng2-file-upload'
import { AlertsService } from '../services/alertsService.service';
import {SnotifyModule, SnotifyService, ToastDefaults} from '../../node_modules/ng-snotify';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditRecoComponent } from './edit-reco/edit-reco.component'
import { SafePipe } from '../pipes/safe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    AuthSignupComponent,
    AuthLoginComponent,
    RecoListComponent,
    ProfileComponent,
    CategoryPipe,
    SafePipe,
    HomeComponent,
    NewRecoComponent,
    NavbarComponent,
    SubMenuComponent,
    UserRecosComponent,
    UsersListComponent,
    RecoViewComponent,
    NotificationsComponent,
    //FileSelectDirective,
    EditProfileComponent,
    EditRecoComponent
    //FileUploader

  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    SnotifyModule,
    FileUploadModule

    
  ],
  providers: [SessionService,RecosService,isLoggedGuardService,UsersService,AlertsService,{ provide: 'SnotifyToastConfig', useValue: ToastDefaults},SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
