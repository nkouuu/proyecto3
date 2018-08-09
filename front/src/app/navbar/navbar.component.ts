import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service';
import { sample } from '../../../node_modules/rxjs/operators';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  lastUser={username:""}
  constructor(public sessionService:SessionService,public uS:UsersService,public route:ActivatedRoute) { 
    this.uS.usersChange.subscribe(u=>{
      if(u){
        
      }else {
        $(".navbar").addClass("full")
      }
    })
  }

  ngOnInit() {
    /*setTimeout(()=>{if(!this.sessionService.user){
      console.log("entra")
      $(".navbar").addClass("full")
      this.lastUser={username:""}
    }else{
      this.lastUser=this.sessionService.user
    }},100)*/
  }


 
}
