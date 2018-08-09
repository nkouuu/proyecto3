import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service';
import { sample } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  lastUser={username:""}
  constructor(public sessionService:SessionService,public uS:UsersService) { 
    this.uS.usersChange.subscribe(u=>{
      if(u&&!this.lastUser.username){
        console.log("1"+u.username+" "+this.lastUser.username)
        this.lastUser=u
        $(".navbar").css({
          

          'animation':"recoger 2s 1",
          'animation-play-state':"running"
        })
        $('.navbar').bind('webkitAnimationEnd', function(){
          this.style.webkitAnimationName = '';
      });
        setTimeout(()=>{
          $(".navbar").removeClass("full")
        },1500)
      }else if(!u){
        //console.log("2"+u.username+" "+this.lastUser.username)
        this.lastUser={username:""}
        $(".navbar").addClass("full")
      }else{ 
        this.lastUser=u
      }
    })
  }

  ngOnInit() {
    setTimeout(()=>{if(!this.sessionService.user){
      console.log("entra")
      $(".navbar").addClass("full")
      this.lastUser={username:""}
    }else{
      this.lastUser=this.sessionService.user
    }},10)
  }


 
}
