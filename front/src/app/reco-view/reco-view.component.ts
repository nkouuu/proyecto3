import { Component, OnInit } from '@angular/core';
import { RecosService } from '../../services/recos.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { UsersService } from '../../services/users.service';
import { SessionService } from '../../services/session.service';
import { AlertsService } from '../../services/alertsService.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-reco-view',
  templateUrl: './reco-view.component.html',
  styleUrls: ['./reco-view.component.scss']
})
export class RecoViewComponent implements OnInit {
  reco:any ={author:""}
  constructor(public rS:RecosService,public route:ActivatedRoute,public uS:UsersService,public sessionService:SessionService,public aS:AlertsService) {
    this.route.params.subscribe(params=>{
      this.rS.getReco(params["id"]).subscribe(r=>this.reco=r)
      this.rS.recosChange.subscribe(r=>{
        var reco=r.find(e=>e._id==this.reco._id)
        console.log("nueva reco "+reco)
        if(reco){
        this.reco=reco
        }
      })
    })
   }

  ngOnInit() {
    setTimeout(()=>{
      $(".navbar").removeClass("full")
    },20)
    setTimeout(()=>{
       if(this.sessionService.user.following.includes(this.reco.author._id)){
         

         $("#followButton").addClass("unfollowButton")
         $("#followButton").text("Unfollow")
       }else{
        $("#followButton").addClass("followButton")

       }
       
     },100)
  }

  newReply(replier,replied,id,content){
    this.rS.newReply(replier,replied,id,content).subscribe(r=>{
      this.aS.sendReply(replier,replied,id)
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
        this.aS.sendFollow(followerId,followedId)

      });
    }
    
  }

  edit(){
    $(".edit").toggleClass("d-none")
  }

  showMedia(event){
    var e= $(event.target).parent().parent()
    if($(event.target).hasClass("fa-angle-down")){
      $(e).find(".picture").removeClass("d-none")
      $(e).find(".video").removeClass("d-none")
      $(event.target).addClass("d-none")
      $(event.target).parent().find(".fa-angle-up").removeClass("d-none")

    }else{
      $(e).find(".picture").addClass("d-none")
      $(e).find(".video").addClass("d-none")
      $(event.target).addClass("d-none")
      $(event.target).parent().find(".fa-angle-down").removeClass("d-none")

    }
  }

}
