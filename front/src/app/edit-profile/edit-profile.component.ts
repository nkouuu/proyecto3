import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FileUploader } from '../../../node_modules/ng2-file-upload';
import { Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session.service';
import { environment} from '../../environments/environment';
const {BASEURL} = environment
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/api/users`,
    method: 'POST'
  });
  feedback;

  userEdit: any = {
    username:"",
    email:"",
    name: '',
    password: '',
  };

  constructor(public uS:UsersService,public router:Router,public sessionService:SessionService) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {

      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
   }

  editUser(user) {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('username', user.username);
      form.append('password', user.password);
      form.append('name', user.name);
      form.append('email', user.email);
    };
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (user) => {
      this.router.navigate(['/profile',this.sessionService.user._id]);
    };
  }

}
