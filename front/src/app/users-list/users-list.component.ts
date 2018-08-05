import { Component, OnInit, Input } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  @Input() user: any = {};
  constructor(public sessionService: SessionService, public uS: UsersService) {}

  ngOnInit() {}

  unfollow(followerId, followedId, event) {
    const button = $(event.path[0])
    const text = $(event.path[0]).text();
    if(text=="Unfollow"){
      this.uS.unfollowUser(followerId, followedId).subscribe(u => {
        button.text("Follow")
        button.addClass("followButton")
      });
    }else if(text=="Follow"){
      this.uS.followUser(followerId, followedId).subscribe(u => {
        button.text("Unfollow")
        button.addClass("unfollowButton")
      });
    }
    
  }
}
