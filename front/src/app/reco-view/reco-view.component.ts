import { Component, OnInit } from '@angular/core';
import { RecosService } from '../../services/recos.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { UsersService } from '../../services/users.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-reco-view',
  templateUrl: './reco-view.component.html',
  styleUrls: ['./reco-view.component.scss']
})
export class RecoViewComponent implements OnInit {
  reco:any ={author:""}
  constructor(public rS:RecosService,public route:ActivatedRoute,public uS:UsersService,public sessionService:SessionService) {
    this.route.params.subscribe(params=>{
      this.rS.getReco(params["id"]).subscribe(r=>this.reco=r)
    })
   }

  ngOnInit() {
    setTimeout(()=>{
       if(this.sessionService.user.following.includes(this.reco.author._id)){
         console.log("entra2")
         

         $("#followButton").addClass("unfollowButton")
         $("#followButton").text("Unfollow")
       }else{
        $("#followButton").addClass("followButton")

       }
     },100)
  }

  newReply(id,content){
    console.log(content)
    console.log(this.reco)
    this.rS.newReply(id,content).subscribe(r=>{
      this.reco=r
    })
  }

  unfollow(followerId, followedId, event) {
    const button = $(event.path[0])
    const text = $(event.path[0]).text();
    if(text=="Unfollow"){
      this.uS.unfollowUser(followerId, followedId).subscribe(u => {
        button.text("Follow")
        button.removeClass("unfollowButton")

        button.addClass("followButton")
      });
    }else if(text=="Follow"){
      this.uS.followUser(followerId, followedId).subscribe(u => {
        button.text("Unfollow")
        button.removeClass("followButton")

        button.addClass("unfollowButton")
      });
    }
    
  }

}
