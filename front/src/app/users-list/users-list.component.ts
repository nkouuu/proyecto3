import { Component, OnInit, Input } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { UsersService } from "../../services/users.service";
import { AlertsService } from "../../services/alertsService.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  @Input() user: any = {};
  constructor(public sessionService: SessionService, public uS: UsersService,public aS:AlertsService) {}

  ngOnInit() {}

  unfollow(followerId, followedId, event) {
    const button = $(event.target)
    const text = $(event.target).text();
    console.log(event)
    if(text=="Unfollow"){
      this.uS.unfollowUser(followerId, followedId).subscribe(u => {
        button.text("Follow")
        button.removeClass("unfollowButton")

        button.addClass("followButton")
      });
    }else if(text=="Follow"){
      this.uS.followUser(followerId, followedId).subscribe(u => {
        this.aS.sendFollow(followerId,followedId)
        button.text("Unfollow")
        button.addClass("unfollowButton")
        button.removeClass("followButton")

      });
    }
    
  }
}
