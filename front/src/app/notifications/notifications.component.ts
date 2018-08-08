import { Component, OnInit, Input } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { UsersService } from "../../services/users.service";
import { Router } from "../../../node_modules/@angular/router";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"]
})
export class NotificationsComponent implements OnInit {
  @Input() notifications: any = [];
  constructor(public sessionService: SessionService, public uS: UsersService,public router:Router) {
    this.sessionService.isLogged().subscribe(u => {
      if(u){
      this.notifications = u.notifications;
      console.log(this.notifications)
      this.uS.usersChange.subscribe(u2=>this.notifications = u2.notifications)
      }
    });
  }

  ngOnInit() {}


  navigate(notify){
    if(notify.notificationType=="follow"){
      this.router.navigate(['/profile',notify.userId._id])
    }else{
      this.router.navigate(['/recos','reco',notify.recoId])

    }
  }
}
