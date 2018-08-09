import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { RecosService } from "../../services/recos.service";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { UsersService } from "../../services/users.service";
import { AlertsService } from "../../services/alertsService.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: any = {recos:"",likes:"",followers:[]};
  section:string ="recos"
  recos: any = [];
  likes:any =[]
  constructor(
    public sessionService: SessionService,
    public rS: RecosService,
    public route: ActivatedRoute,
    public uS: UsersService,
    public aS:AlertsService
  ) {
    this.route.params.subscribe(params => {
      const id = params["id"];

      this.uS.getUser(id).subscribe(user => {
        this.user = user;
        /*this.recos=user.recos
        this.likes = user.likes*/

        this.rS.getRecos().subscribe(recos => {
          this.recos = recos.filter(e => e.author == this.user._id);
          this.rS.recosChange.subscribe(r=>this.recos=r)
        });
      });
    });
  }

  

  ngOnInit() {
    setTimeout(()=>{
      $(".navbar").removeClass("full")

     console.log( this.sessionService.user)
      if(this.sessionService.user.following.includes(this.user._id)){
        console.log("entra2")
        $("#followButton").addClass("unfollowButton")
        $("#followButton").text("Unfollow")

      }
    },20)

    
  }
unfollow(followerId, followedId, event) {
    const button = $(event.target)
    const text = $(event.target).text();
    if(text=="Unfollow"){
      this.uS.unfollowUser(followerId, followedId).subscribe(u => {
        button.text("Follow")
        button.removeClass("unfollowButton")

        button.addClass("followButton")

      });
    }else if(text=="Follow"){
      console.log("followbutton")
      this.uS.followUser(followerId, followedId).subscribe(u => {
        button.text("Unfollow")
        button.removeClass("followButton")
        button.addClass("unfollowButton")
        this.aS.sendFollow(followerId, followedId)

      });
    }
    
  }
  changeSection(section:string,event){
    console.log(event)
    $(".row2tab li").css({
      color: "#555",
    "border-bottom": "2px solid #f1f1f1"
    })
    
    $(event.target).css({
      "border-bottom": "2px solid #6AAFEA",
      color: "#6AAFEA"

    })
    
    
    this.section=section
  }

  sendFollow(followerId,followedId){
    console.log()
  }
}
